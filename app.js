// Symptom Checker Application Logic & Disease Likelihood Engine - MediGraph v3.2

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    selectedSymptoms: [],
    highlightedIndex: -1,
    currentSuggestions: [],
    theme: 'dark',
    viewMode: 'device', // 'device' or 'desktop'
    resultsDisplayMode: 'cards', // 'cards' or 'matrix'
    selectedRegion: 'chest'
  };

  // Anatomical Body Regions Map
  const BODY_REGION_SYMPTOMS = {
    head: ["headache", "dizziness", "diminished vision", "seizures", "facial pain", "confusion", "slurring words", "ear pain", "loss of sensation"],
    chest: ["chest pain", "shortness of breath", "cough", "palpitations", "wheezing", "chest tightness", "angina pectoris", "pressure chest", "rapid heart rate"],
    abdomen: ["sharp abdominal pain", "nausea", "vomiting", "diarrhea", "constipation", "upper abdominal pain", "lower abdominal pain", "stomach bloating", "heartburn"],
    limbs: ["joint pain", "knee pain", "back pain", "leg pain", "arm pain", "wrist pain", "hand or finger pain", "muscle pain", "shoulder pain"],
    general: ["fever", "fatigue", "chills", "skin rash", "weight gain", "weight loss", "sweating", "itching of skin", "swelling"]
  };

  const POPULAR_SYMPTOMS = [
    "chest pain", "shortness of breath", "fever", "cough", 
    "headache", "dizziness", "fatigue", "nausea", 
    "joint pain", "back pain", "sharp abdominal pain", "skin rash"
  ];

  // DOM Elements
  const symptomInput = document.getElementById('symptom-input');
  const suggestionsDropdown = document.getElementById('suggestions-dropdown');
  const selectedTagsContainer = document.getElementById('selected-tags-container');
  const tagsCount = document.getElementById('tags-count');
  const quickChipsGrid = document.getElementById('quick-chips-grid');
  const regionSymptomsList = document.getElementById('region-symptoms-list');
  const diagnosticResultsContainer = document.getElementById('diagnostic-results');
  const resultsCountEl = document.getElementById('results-count');

  // Mode Toggles & Buttons
  const themeSelect = document.getElementById('theme-select');
  const layoutToggleBtn = document.getElementById('layout-toggle-btn');
  const specToggleBtn = document.getElementById('spec-toggle-btn');
  const layoutWrapper = document.getElementById('layout-wrapper');
  const tableauSpecView = document.getElementById('tableau-spec-view');
  const clearAllBtn = document.getElementById('clear-all-btn');

  // View Mode Toggles
  const viewCardsBtn = document.getElementById('view-cards-btn');
  const viewMatrixBtn = document.getElementById('view-matrix-btn');

  // Tabs
  const tabSearch = document.getElementById('tab-search');
  const tabBody = document.getElementById('tab-body');
  const contentSearch = document.getElementById('content-search');
  const contentBody = document.getElementById('content-body');

  // Modal Elements
  const bookingModal = document.getElementById('booking-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalSummaryBox = document.getElementById('modal-summary-box');
  const bookingForm = document.getElementById('booking-form');

  // Initialize Quick Chips & Region Chips
  function renderQuickChips() {
    quickChipsGrid.innerHTML = '';
    POPULAR_SYMPTOMS.forEach(sym => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `chip-btn ${state.selectedSymptoms.includes(sym) ? 'selected' : ''}`;
      btn.textContent = sym;
      btn.setAttribute('aria-pressed', state.selectedSymptoms.includes(sym));
      btn.addEventListener('click', () => toggleSymptom(sym));
      quickChipsGrid.appendChild(btn);
    });
  }

  function renderRegionSymptoms() {
    regionSymptomsList.innerHTML = '';
    const symptoms = BODY_REGION_SYMPTOMS[state.selectedRegion] || [];
    symptoms.forEach(sym => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `chip-btn ${state.selectedSymptoms.includes(sym) ? 'selected' : ''}`;
      btn.textContent = `+ ${sym}`;
      btn.addEventListener('click', () => toggleSymptom(sym));
      regionSymptomsList.appendChild(btn);
    });
  }

  // Symptom Selection
  function toggleSymptom(symptom) {
    const index = state.selectedSymptoms.indexOf(symptom);
    if (index === -1) {
      state.selectedSymptoms.push(symptom);
    } else {
      state.selectedSymptoms.splice(index, 1);
    }
    symptomInput.value = '';
    closeDropdown();
    updateUI();
  }

  function addSymptom(symptom) {
    if (!state.selectedSymptoms.includes(symptom)) {
      state.selectedSymptoms.push(symptom);
      symptomInput.value = '';
      closeDropdown();
      updateUI();
    }
  }

  function removeSymptom(symptom) {
    state.selectedSymptoms = state.selectedSymptoms.filter(s => s !== symptom);
    updateUI();
  }

  // Auto-complete Search Logic
  function handleInput() {
    const query = symptomInput.value.trim().toLowerCase();
    if (!query) {
      closeDropdown();
      return;
    }

    state.currentSuggestions = ALL_SYMPTOMS.filter(sym => 
      !state.selectedSymptoms.includes(sym) && sym.toLowerCase().includes(query)
    ).slice(0, 8);

    state.highlightedIndex = -1;
    renderSuggestions(query);
  }

  function renderSuggestions(query) {
    if (state.currentSuggestions.length === 0) {
      suggestionsDropdown.innerHTML = `<div class="suggestion-item" style="color: var(--color-text-muted);">No matching symptoms found</div>`;
      suggestionsDropdown.classList.add('open');
      return;
    }

    suggestionsDropdown.innerHTML = '';
    state.currentSuggestions.forEach((sym, idx) => {
      const item = document.createElement('div');
      item.className = `suggestion-item ${idx === state.highlightedIndex ? 'highlighted' : ''}`;
      item.setAttribute('role', 'option');
      
      const matchPos = sym.toLowerCase().indexOf(query);
      if (matchPos !== -1) {
        const before = sym.substring(0, matchPos);
        const match = sym.substring(matchPos, matchPos + query.length);
        const after = sym.substring(matchPos + query.length);
        item.innerHTML = `<span>${before}<mark>${match}</mark>${after}</span> <small style="color: var(--color-text-muted);">+ Select</small>`;
      } else {
        item.textContent = sym;
      }

      item.addEventListener('click', () => addSymptom(sym));
      suggestionsDropdown.appendChild(item);
    });

    suggestionsDropdown.classList.add('open');
  }

  function closeDropdown() {
    suggestionsDropdown.classList.remove('open');
    state.highlightedIndex = -1;
  }

  // Render Selected Tags
  function renderSelectedTags() {
    selectedTagsContainer.innerHTML = '';
    tagsCount.textContent = `(${state.selectedSymptoms.length})`;

    if (state.selectedSymptoms.length === 0) {
      selectedTagsContainer.innerHTML = `<span style="font-size: 0.875rem; color: var(--color-text-muted); font-style: italic;">No symptoms added. Search above or select body region.</span>`;
      clearAllBtn.style.display = 'none';
      return;
    }

    clearAllBtn.style.display = 'inline-block';

    state.selectedSymptoms.forEach(sym => {
      const tag = document.createElement('div');
      tag.className = 'symptom-tag';
      tag.innerHTML = `
        <span>${sym}</span>
        <button type="button" class="tag-remove-btn" aria-label="Remove ${sym}">×</button>
      `;
      tag.querySelector('.tag-remove-btn').addEventListener('click', () => removeSymptom(sym));
      selectedTagsContainer.appendChild(tag);
    });
  }

  // Disease Likelihood Calculation Algorithm
  function calculateDiagnostics() {
    if (state.selectedSymptoms.length === 0) return [];

    const matches = MEDICAL_DATASET.map(item => {
      const diseaseSyms = item.symptoms;
      const matchedSyms = diseaseSyms.filter(s => state.selectedSymptoms.includes(s));
      
      if (matchedSyms.length === 0) return null;

      const diseaseCoverage = matchedSyms.length / diseaseSyms.length;
      const userCoverage = matchedSyms.length / state.selectedSymptoms.length;
      const score = Math.min(99, Math.max(12, Math.round((diseaseCoverage * 0.65 + userCoverage * 0.35) * 100)));

      let triage = 'routine';
      let triageLabel = 'Primary Care Referral';
      const isEmergency = matchedSyms.some(s => 
        ['pain chest', 'shortness of breath', 'unresponsiveness', 'st segment elevation', 'convulsions', 'loss of consciousness', 'haemorrhage'].includes(s.toLowerCase())
      );

      if (isEmergency || score >= 75) {
        triage = 'emergency';
        triageLabel = '🚨 High Likelihood / Emergency Triage';
      } else if (score >= 45) {
        triage = 'urgent';
        triageLabel = '⚠️ Moderate Likelihood / Specialist Consult';
      }

      return {
        disease: item.disease,
        specialists: item.specialists,
        symptoms: item.symptoms,
        matchedSymptoms: matchedSyms,
        unmatchedSymptoms: diseaseSyms.filter(s => !state.selectedSymptoms.includes(s)),
        score: score,
        triage: triage,
        triageLabel: triageLabel
      };
    }).filter(Boolean);

    return matches.sort((a, b) => b.score - a.score);
  }

  // Render Diagnostic Results
  function renderDiagnosticResults() {
    const results = calculateDiagnostics();
    diagnosticResultsContainer.innerHTML = '';
    resultsCountEl.textContent = `${results.length} condition${results.length === 1 ? '' : 's'} matched`;

    if (state.selectedSymptoms.length === 0) {
      diagnosticResultsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🩺</div>
          <h3>Add Symptoms to Calculate Disease Likelihood</h3>
          <p style="margin-top: 6px;">Select symptoms via search or body region map to compute probability percentages and recommended specialist referrals.</p>
        </div>
      `;
      return;
    }

    if (results.length === 0) {
      diagnosticResultsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No Direct Disease Match Found</h3>
          <p style="margin-top: 6px;">Try searching for broader symptoms or select additional body regions.</p>
        </div>
      `;
      return;
    }

    if (state.resultsDisplayMode === 'matrix') {
      renderDifferentialMatrix(results);
    } else {
      renderCardsView(results);
    }
  }

  // Render Card View
  function renderCardsView(results) {
    results.forEach(res => {
      const card = document.createElement('article');
      card.className = 'diagnostic-card';

      let scoreClass = 'low';
      if (res.score >= 75) scoreClass = 'high';
      else if (res.score >= 45) scoreClass = 'medium';

      card.innerHTML = `
        <div class="card-top-row">
          <div>
            <h3 class="disease-name">${res.disease}</h3>
            <span class="triage-badge ${res.triage}">${res.triageLabel}</span>
          </div>
          
          <div class="percentage-gauge-badge">
            <div class="score-circle ${scoreClass}">
              ${res.score}%
            </div>
          </div>
        </div>

        <div class="score-section">
          <div class="score-header">
            <span class="score-label">Clinical Probability & Overlap</span>
            <span style="font-size: 0.8125rem; color: var(--color-text-muted);">${res.matchedSymptoms.length} of ${res.symptoms.length} symptoms matched</span>
          </div>
          <div class="progress-track" role="progressbar" aria-valuenow="${res.score}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-fill ${scoreClass}" style="width: ${res.score}%;"></div>
          </div>
        </div>

        <div class="symptom-match-breakdown">
          <div class="breakdown-title">Matching Patient Symptoms (${res.matchedSymptoms.length})</div>
          <div class="match-pills-row">
            ${res.matchedSymptoms.map(s => `<span class="pill-matched">✓ ${s}</span>`).join('')}
          </div>

          ${res.unmatchedSymptoms.length > 0 ? `
            <div class="breakdown-title" style="margin-top: 10px;">Additional Disease Indicators (${res.unmatchedSymptoms.length})</div>
            <div class="match-pills-row">
              ${res.unmatchedSymptoms.slice(0, 5).map(s => `<span class="pill-unmatched">${s}</span>`).join('')}
              ${res.unmatchedSymptoms.length > 5 ? `<span class="pill-unmatched">+${res.unmatchedSymptoms.length - 5} more</span>` : ''}
            </div>
          ` : ''}
        </div>

        <div class="specialist-section">
          <div class="specialist-label">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            Recommended Specialists:
          </div>
          <div class="specialist-list">
            ${res.specialists.map(spec => `<span class="specialist-chip">👨‍⚕️ ${spec}</span>`).join('')}
          </div>
        </div>

        <div class="action-btn-row">
          <button type="button" class="btn-cta book-consult-btn" data-disease="${res.disease}" data-score="${res.score}" data-specialist="${res.specialists[0] || 'Specialist'}">
            Book Specialist Consult
          </button>
          <button type="button" class="btn-secondary">
            Disease Profile
          </button>
        </div>
      `;

      diagnosticResultsContainer.appendChild(card);
    });

    document.querySelectorAll('.book-consult-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dName = e.currentTarget.getAttribute('data-disease');
        const dScore = e.currentTarget.getAttribute('data-score');
        const dSpec = e.currentTarget.getAttribute('data-specialist');
        openBookingModal(dName, dScore, dSpec);
      });
    });
  }

  // Render Differential Matrix View
  function renderDifferentialMatrix(results) {
    const tableContainer = document.createElement('div');
    tableContainer.className = 'matrix-table-container';

    let tableHTML = `
      <table class="matrix-table">
        <thead>
          <tr>
            <th>Disease Condition</th>
            <th>Likelihood %</th>
            <th>Matched Symptoms</th>
            <th>Recommended Specialist</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
    `;

    results.forEach(res => {
      tableHTML += `
        <tr>
          <td style="font-weight: 700; text-transform: capitalize;">${res.disease}</td>
          <td><span class="score-val ${res.score >= 75 ? 'high' : (res.score >= 45 ? 'medium' : 'low')}">${res.score}%</span></td>
          <td>${res.matchedSymptoms.map(s => `<span class="pill-matched" style="display:inline-block; margin: 2px;">${s}</span>`).join('')}</td>
          <td>${res.specialists.map(sp => `<span class="specialist-chip" style="font-size: 0.75rem;">${sp}</span>`).join(' ')}</td>
          <td><button class="btn-cta book-consult-btn" style="padding: 4px 10px; font-size: 0.75rem; min-height: 32px;" data-disease="${res.disease}" data-score="${res.score}" data-specialist="${res.specialists[0] || 'Specialist'}">Book Consult</button></td>
        </tr>
      `;
    });

    tableHTML += `</tbody></table>`;
    tableContainer.innerHTML = tableHTML;
    diagnosticResultsContainer.appendChild(tableContainer);

    document.querySelectorAll('.book-consult-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dName = e.currentTarget.getAttribute('data-disease');
        const dScore = e.currentTarget.getAttribute('data-score');
        const dSpec = e.currentTarget.getAttribute('data-specialist');
        openBookingModal(dName, dScore, dSpec);
      });
    });
  }

  // Telehealth Booking Modal Logic
  function openBookingModal(disease, score, specialist) {
    modalSummaryBox.innerHTML = `
      <div style="font-weight: 700; color: var(--color-text-title); text-transform: capitalize; font-size: 1.05rem;">
        Condition: ${disease} (${score}% Likelihood)
      </div>
      <div style="margin-top: 6px; font-size: 0.85rem; color: var(--color-primary);">
        Assigned Specialist Type: ${specialist}
      </div>
      <div style="margin-top: 6px; font-size: 0.8125rem; color: var(--color-text-muted);">
        Reported Patient Symptoms: ${state.selectedSymptoms.join(', ')}
      </div>
    `;
    bookingModal.classList.add('open');
  }

  closeModalBtn.addEventListener('click', () => bookingModal.classList.remove('open'));
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) bookingModal.classList.remove('open');
  });

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('🎉 Telehealth Consultation Request Confirmed! A medical coordinator will contact you shortly.');
    bookingModal.classList.remove('open');
  });

  // Tab Bar Switcher
  tabSearch.addEventListener('click', () => {
    tabSearch.classList.add('active');
    tabBody.classList.remove('active');
    contentSearch.classList.add('active');
    contentBody.classList.remove('active');
  });

  tabBody.addEventListener('click', () => {
    tabBody.classList.add('active');
    tabSearch.classList.remove('active');
    contentBody.classList.add('active');
    contentSearch.classList.remove('active');
    renderRegionSymptoms();
  });

  // Body Region Chips Click
  document.querySelectorAll('.region-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('.region-chip').forEach(c => c.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.selectedRegion = e.currentTarget.getAttribute('data-region');
      renderRegionSymptoms();
    });
  });

  // View Display Mode Toggles (Cards vs Matrix)
  viewCardsBtn.addEventListener('click', () => {
    state.resultsDisplayMode = 'cards';
    viewCardsBtn.classList.add('active');
    viewMatrixBtn.classList.remove('active');
    renderDiagnosticResults();
  });

  viewMatrixBtn.addEventListener('click', () => {
    state.resultsDisplayMode = 'matrix';
    viewMatrixBtn.classList.add('active');
    viewCardsBtn.classList.remove('active');
    renderDiagnosticResults();
  });

  // Theme Dropdown Handler
  themeSelect.addEventListener('change', (e) => {
    state.theme = e.target.value;
    document.body.setAttribute('data-theme', state.theme);
  });

  // Update Full UI
  function updateUI() {
    renderQuickChips();
    renderSelectedTags();
    renderDiagnosticResults();
  }

  // Input Event Listeners
  symptomInput.addEventListener('input', handleInput);
  symptomInput.addEventListener('focus', () => {
    if (symptomInput.value.trim()) handleInput();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-input-group')) closeDropdown();
  });

  clearAllBtn.addEventListener('click', () => {
    state.selectedSymptoms = [];
    updateUI();
  });

  layoutToggleBtn.addEventListener('click', () => {
    state.viewMode = state.viewMode === 'device' ? 'desktop' : 'device';
    if (state.viewMode === 'desktop') {
      layoutWrapper.className = 'layout-wrapper desktop-mode';
      layoutToggleBtn.innerHTML = '📱 Mobile View';
    } else {
      layoutWrapper.className = 'layout-wrapper device-frame-mode';
      layoutToggleBtn.innerHTML = '🖥️ Desktop View';
    }
  });

  specToggleBtn.addEventListener('click', () => {
    const isActive = tableauSpecView.classList.toggle('active');
    specToggleBtn.innerHTML = isActive ? '📊 Hide UX Spec' : '📊 View UX Spec';
  });

  // Initial Render
  updateUI();
});
