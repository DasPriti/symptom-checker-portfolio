// Symptom Checker Application Logic & Diagnostic Engine

document.addEventListener('DOMContentLoaded', () => {
  // State
  const state = {
    selectedSymptoms: [],
    highlightedIndex: -1,
    currentSuggestions: [],
    theme: 'dark',
    viewMode: 'device' // 'device' or 'desktop'
  };

  // Popular quick chips
  const POPULAR_SYMPTOMS = [
    "chest pain", "shortness of breath", "fever", "cough", 
    "headache", "dizziness", "fatigue", "nausea", 
    "joint pain", "back pain", "abdominal pain", "skin rash"
  ];

  // DOM Elements
  const symptomInput = document.getElementById('symptom-input');
  const suggestionsDropdown = document.getElementById('suggestions-dropdown');
  const selectedTagsContainer = document.getElementById('selected-tags-container');
  const tagsCount = document.getElementById('tags-count');
  const quickChipsGrid = document.getElementById('quick-chips-grid');
  const diagnosticResultsContainer = document.getElementById('diagnostic-results');
  const resultsCountEl = document.getElementById('results-count');

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const layoutToggleBtn = document.getElementById('layout-toggle-btn');
  const specToggleBtn = document.getElementById('spec-toggle-btn');
  const layoutWrapper = document.getElementById('layout-wrapper');
  const tableauSpecView = document.getElementById('tableau-spec-view');
  const clearAllBtn = document.getElementById('clear-all-btn');

  // Initialize Popular Quick Chips
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

  // Toggle Symptom Selection
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

  // Auto-complete Search Filtering
  function handleInput() {
    const query = symptomInput.value.trim().toLowerCase();
    if (!query) {
      closeDropdown();
      return;
    }

    // Filter available symptoms not already selected
    state.currentSuggestions = ALL_SYMPTOMS.filter(sym => 
      !state.selectedSymptoms.includes(sym) && sym.toLowerCase().includes(query)
    ).slice(0, 8); // Limit to top 8 suggestions

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
      item.setAttribute('id', `opt-${idx}`);
      
      // Highlight matching sub-text
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

  // Keyboard Navigation for Auto-complete
  symptomInput.addEventListener('keydown', (e) => {
    if (!suggestionsDropdown.classList.contains('open')) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      state.highlightedIndex = (state.highlightedIndex + 1) % state.currentSuggestions.length;
      updateHighlight();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      state.highlightedIndex = (state.highlightedIndex - 1 + state.currentSuggestions.length) % state.currentSuggestions.length;
      updateHighlight();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (state.highlightedIndex >= 0 && state.highlightedIndex < state.currentSuggestions.length) {
        addSymptom(state.currentSuggestions[state.highlightedIndex]);
      } else if (state.currentSuggestions.length > 0) {
        addSymptom(state.currentSuggestions[0]);
      }
    } else if (e.key === 'Escape') {
      closeDropdown();
    }
  });

  function updateHighlight() {
    const items = suggestionsDropdown.querySelectorAll('.suggestion-item');
    items.forEach((item, idx) => {
      item.classList.toggle('highlighted', idx === state.highlightedIndex);
      if (idx === state.highlightedIndex) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  // Render Selected Tags
  function renderSelectedTags() {
    selectedTagsContainer.innerHTML = '';
    tagsCount.textContent = `(${state.selectedSymptoms.length})`;

    if (state.selectedSymptoms.length === 0) {
      selectedTagsContainer.innerHTML = `<span style="font-size: 0.875rem; color: var(--color-text-muted); font-style: italic;">No symptoms added yet. Type above or click quick chips.</span>`;
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

  // Calculate Disease Matching & Diagnostic Score
  function calculateDiagnostics() {
    if (state.selectedSymptoms.length === 0) {
      return [];
    }

    const matches = MEDICAL_DATASET.map(item => {
      const diseaseSyms = item.symptoms;
      const matchedSyms = diseaseSyms.filter(s => state.selectedSymptoms.includes(s));
      
      if (matchedSyms.length === 0) return null;

      // Scoring formula: (Matched Symptoms / Disease Total Symptoms) * 0.6 + (Matched Symptoms / Selected Total) * 0.4
      const diseaseCoverage = matchedSyms.length / diseaseSyms.length;
      const userCoverage = matchedSyms.length / state.selectedSymptoms.length;
      const score = Math.round((diseaseCoverage * 0.65 + userCoverage * 0.35) * 100);

      // Determine Severity / Triage Level
      let triage = 'routine';
      let triageLabel = 'Primary Care Referral';
      const isEmergency = matchedSyms.some(s => 
        ['pain chest', 'shortness of breath', 'unresponsiveness', 'st segment elevation', 'convulsions', 'loss of consciousness', 'haemorrhage'].includes(s.toLowerCase())
      );

      if (isEmergency || score >= 80) {
        triage = 'emergency';
        triageLabel = 'Urgent / Emergency Assessment';
      } else if (score >= 45) {
        triage = 'urgent';
        triageLabel = 'Specialist Evaluation Recommended';
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

    // Sort by Score descending
    return matches.sort((a, b) => b.score - a.score);
  }

  // Render Diagnostic Summary Cards
  function renderDiagnosticCards() {
    const results = calculateDiagnostics();
    diagnosticResultsContainer.innerHTML = '';
    resultsCountEl.textContent = `${results.length} condition${results.length === 1 ? '' : 's'} matched`;

    if (state.selectedSymptoms.length === 0) {
      diagnosticResultsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🩺</div>
          <h3>Select Symptoms to Begin Analysis</h3>
          <p style="margin-top: 6px;">Add one or more symptoms above to view differential diagnostic matches and specialist recommendations.</p>
        </div>
      `;
      return;
    }

    if (results.length === 0) {
      diagnosticResultsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No Direct Match Found</h3>
          <p style="margin-top: 6px;">Try adjusting your selected symptoms or search for broader clinical signs.</p>
        </div>
      `;
      return;
    }

    results.forEach(res => {
      const card = document.createElement('article');
      card.className = 'diagnostic-card';
      card.setAttribute('aria-label', `Diagnostic result for ${res.disease}`);

      // Score classification
      let scoreClass = 'low';
      if (res.score >= 70) scoreClass = 'high';
      else if (res.score >= 40) scoreClass = 'medium';

      card.innerHTML = `
        <div class="card-top-row">
          <div>
            <h3 class="disease-name">${res.disease}</h3>
            <span class="triage-badge ${res.triage}">${res.triageLabel}</span>
          </div>
          <div class="score-val ${scoreClass}">${res.score}% Match</div>
        </div>

        <div class="score-section">
          <div class="score-header">
            <span class="score-label">Clinical Correlation Score</span>
            <span style="font-size: 0.8125rem; color: var(--color-text-muted);">${res.matchedSymptoms.length} of ${res.symptoms.length} symptoms match</span>
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
            <div class="breakdown-title" style="margin-top: 10px;">Other Characteristic Symptoms (${res.unmatchedSymptoms.length})</div>
            <div class="match-pills-row">
              ${res.unmatchedSymptoms.slice(0, 6).map(s => `<span class="pill-unmatched">${s}</span>`).join('')}
              ${res.unmatchedSymptoms.length > 6 ? `<span class="pill-unmatched">+${res.unmatchedSymptoms.length - 6} more</span>` : ''}
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
          <button type="button" class="btn-cta">
            Find Specialist nearby
          </button>
          <button type="button" class="btn-secondary">
            Condition Info
          </button>
        </div>
      `;

      diagnosticResultsContainer.appendChild(card);
    });
  }

  // Update All UI Components
  function updateUI() {
    renderQuickChips();
    renderSelectedTags();
    renderDiagnosticCards();
  }

  // Event Listeners
  symptomInput.addEventListener('input', handleInput);
  symptomInput.addEventListener('focus', () => {
    if (symptomInput.value.trim()) handleInput();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-input-group')) {
      closeDropdown();
    }
  });

  clearAllBtn.addEventListener('click', () => {
    state.selectedSymptoms = [];
    updateUI();
  });

  // Mode Toggles
  themeToggleBtn.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', state.theme);
    themeToggleBtn.innerHTML = state.theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  });

  layoutToggleBtn.addEventListener('click', () => {
    state.viewMode = state.viewMode === 'device' ? 'desktop' : 'device';
    if (state.viewMode === 'desktop') {
      layoutWrapper.className = 'layout-wrapper desktop-mode';
      layoutToggleBtn.innerHTML = '📱 Mobile Frame View';
    } else {
      layoutWrapper.className = 'layout-wrapper device-frame-mode';
      layoutToggleBtn.innerHTML = '🖥️ Expanded Dashboard View';
    }
  });

  specToggleBtn.addEventListener('click', () => {
    const isActive = tableauSpecView.classList.toggle('active');
    specToggleBtn.innerHTML = isActive ? '📊 Hide Tableau/UX Spec' : '📊 View Tableau/UX Spec';
  });

  // Initial Render
  updateUI();
});
