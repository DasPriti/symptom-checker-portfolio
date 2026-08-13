# 🩺 Lead Healthcare UX/UI Design Specification & Architecture

**Project:** Medical Graph Symptom-to-Disease & Specialist Mapping Application  
**Role:** Lead Healthcare UX/UI Designer  
**Repository:** [DasPriti/symptom-checker-portfolio](https://github.com/DasPriti/symptom-checker-portfolio)  
**Compliance Target:** WCAG 2.1 Level AA (Contrast, Keyboard Focus, Screen Reader ARIA)

---

## 1. Executive UX Strategy & Clinical Context

Healthcare digital products operate under unique emotional and clinical constraints. Users accessing a symptom checker are frequently experiencing acute distress, anxiety, or physical discomfort. The primary UX goals are **reducing cognitive load**, **establishing immediate clinical trust**, **ensuring patient safety through triage**, and **delivering zero-friction interaction**.

```
┌─────────────────────────────────────────────────────────────┐
│                    HEALTHCARE UX TRIAGE FLOW                │
└─────────────────────────────────────────────────────────────┘
   [ Emergency Banner Alert (Red High-Contrast Top Sticky) ]
                             │
                             ▼
   [ Step 1: Symptom Selector ] ──► Auto-complete + Tag Pills
                             │
                             ▼
   [ Step 2: Diagnostic Match ] ──► Weighted Correlation Score
                             │
                             ▼
   [ Step 3: Specialist Referral ] ──► Ranked Specialist Badges
```

### Core UX Principles:
1. **Immediate Safety Triage**: An omnipresent high-visibility emergency banner alerts patients experiencing life-threatening symptoms (e.g., chest pain, severe dyspnea, stroke signs) to seek immediate emergency medical care (911).
2. **Mobile Thumb-Zone Optimization**: Critical interactive controls (symptom search input, tag removal, CTAs) are constrained within the natural reach zone of single-handed mobile usage.
3. **Transparent Clinical Hierarchy**: Differential diagnostic matches display explicit correlation percentages, transparent symptom overlap, and severity badges (Emergency, Urgent, Routine) to prevent patient misinterpretation.

---

## 2. Mobile-First Wireframe Layout & Ergonomics

### Mobile Viewport Structure (375px - 430px)

```
┌─────────────────────────────────────────────────────────────┐
│ 09:41                             🔋  📶  📡                │
├─────────────────────────────────────────────────────────────┤
│ 🏥 MediGraph Mobile                    WCAG 2.1 AA Compliant│
├─────────────────────────────────────────────────────────────┤
│ ⚠️ EMERGENCY: If chest pain or severe shortness of breath, │
│    call 911 immediately.                                    │
├─────────────────────────────────────────────────────────────┤
│  [1. Select Symptoms] ──── [2. Matches] ──── [3. Specialist]│
├─────────────────────────────────────────────────────────────┤
│ 🔍 SYMPTOM SELECTOR WIDGET                                   │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🔎 Search symptom (e.g. chest pain, fever)...          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ SELECTED SYMPTOMS (3)                      [ Clear All ]    │
│ ┌──────────────┐ ┌────────────────────┐ ┌───────────────┐   │
│ │ chest pain × │ │ shortness of breath│ │ dizziness  × │   │
│ └──────────────┘ └────────────────────┘ └───────────────┘   │
│                                                             │
│ POPULAR QUICK CHIPS:                                        │
│ [ + Fever ] [ + Cough ] [ + Headache ] [ + Nausea ]        │
├─────────────────────────────────────────────────────────────┤
│ 📊 DIAGNOSTIC MATCHES (2 Conditions Matched)                │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Hypertensive Disease               [ 88% Match ]        │ │
│ │ 🚨 URGENT / EMERGENCY ASSESSMENT                        │ │
│ │                                                         │ │
│ │ Correlation Score                                       │ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░ 88%             │ │
│ │                                                         │ │
│ │ MATCHING SYMPTOMS (3)                                   │ │
│ │ [✓ chest pain] [✓ shortness of breath] [✓ dizziness]    │ │
│ │                                                         │ │
│ │ RECOMMENDED SPECIALISTS                                 │ │
│ │ 👨‍⚕️ Cardiologist                                       │ │
│ │                                                         │ │
│ │ [ Find Specialist Nearby ]  [ Condition Info ]          │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Interactive Symptom Selector Widget Specification

The Symptom Selector widget combines auto-complete fuzzy matching with intuitive tag management to enable rapid symptom entry without requiring clinical terminology expertise.

### Technical & UX Behavior:
* **Auto-complete Engine**: Filters against all 655 dataset symptoms in real time. Matches both prefix and substring terms, highlighting matched text with `<mark>` tags.
* **Keyboard Ergonomics**: Full support for `ArrowDown`, `ArrowUp`, `Enter`, and `Escape` key navigation.
* **Tag Management**: Added symptoms transform into high-contrast pills with an explicit `×` removal button.
* **Popular Quick Chips**: Direct one-tap chips for top acute symptoms (`chest pain`, `shortness of breath`, `fever`, `cough`, `headache`, `dizziness`, `fatigue`, `nausea`).

---

## 4. Diagnostic Summary Card & Specialist Hierarchy

### Mathematical Correlation Scoring Model

To determine diagnostic rank, the engine calculates a weighted Jaccard & Coverage Index:

$$\text{Match \%} = \left( \frac{|\text{Selected Symptoms} \cap \text{Disease Symptoms}|}{|\text{Disease Symptoms}|} \times 0.65 + \frac{|\text{Selected Symptoms} \cap \text{Disease Symptoms}|}{|\text{Selected Symptoms}|} \times 0.35 \right) \times 100\%$$

Where:
* $\text{Selected Symptoms}$ = Array of symptoms selected by user.
* $\text{Disease Symptoms}$ = Array of symptoms associated with disease in dataset.

### Visual Score Gauge & Triage Matrix

| Correlation Range | Visual Gauge Color | Contrast Token | Clinical Triage Level |
| :--- | :--- | :--- | :--- |
| **80% – 100%** | Emerald Gradient (`#059669` → `#10B981`) | 7.2:1 | 🚨 Emergency / Urgent Evaluation |
| **45% – 79%** | Amber Gradient (`#D97706` → `#F59E0B`) | 5.8:1 | ⚠️ Specialist Referral Recommended |
| **0% – 44%** | Muted Slate (`#64748B` → `#94A3B8`) | 4.9:1 | ℹ️ Primary Care / Self-Care |

### Card Information Architecture:
1. **Header Row**: Disease Name (`font-size: 1.15rem`, `font-weight: 700`) + Severity Badge + Correlation Percentage.
2. **Correlation Progress Bar**: Smooth animated SVG/CSS progress track with screen reader `aria-valuenow`.
3. **Symptom Breakdown Box**:
   * *Matching Symptoms*: Highlighted emerald pill badges (`✓ pain chest`).
   * *Other Disease Symptoms*: Collapsible muted slate pills.
4. **Specialist Recommendation Row**: Badges listing mapped specialists (`Specialist_1` to `Specialist_22` from dataset).
5. **Action Row**: Primary CTA button ("Find Specialist nearby") + Secondary CTA ("Condition Info").

---

## 5. Accessibility Audit & Compliance Matrix (WCAG 2.1 AA)

| Requirement | WCAG Guideline | Implementation Detail |
| :--- | :--- | :--- |
| **Contrast Ratio** | 1.4.3 Contrast (Minimum) | Title/Body text >= 4.5:1. Primary Cyan (`#00D2D3`) on Dark Blue (`#0B132B`) is **9.4:1**. |
| **Touch Targets** | 2.5.5 Target Size | All buttons, chips, and tag removal controls maintain min height of **48px**. |
| **Focus Visible** | 2.4.7 Focus Visible | 3px high-visibility cyan outline (`#00D2D3`) with 2px offset on keyboard `:focus-visible`. |
| **Dynamic Updates** | 4.1.3 Status Messages | Diagnostic results container marked with `aria-live="polite"` for screen readers. |
| **Search Semantics** | 4.1.2 Name, Role, Value | Input includes `aria-autocomplete="list"`, `aria-controls="suggestions-dropdown"`, `aria-expanded`. |

---

## 6. Tableau Dashboard Layout Specification

For enterprise healthcare analytics and clinical dashboard deployment in **Tableau Desktop / Tableau Server**, the layout specification is structured as follows:

```
+-----------------------------------------------------------------------------------+
| TABLEAU DASHBOARD CONTAINER SPECIFICATION (1440px x 900px Tiled Grid)             |
+-----------------------------------------------------------------------------------+
| [CONTAINER 1: TOP HEADER & TRIAGE FILTER BANNER] (Height: 80px, Fixed)            |
| - Parameter: Patient ID / Age Group / Emergency Triage Override                   |
+------------------------------------+----------------------------------------------+
| [CONTAINER 2: SYMPTOM FILTER PANE] | [CONTAINER 3: DIAGNOSTIC CORRELATION MATRIX] |
| (Width: 360px, Tiled)              | (Width: Flex Auto, Height: 500px)            |
| - Custom HTML/JS Extension         | - Worksheet: Disease Correlation Treemap     |
|   (Tag Selector & Search)          | - Marks: Color by Match % (Emerald to Amber) |
| - Filter: Symptom Multi-Select     | - Tooltip: Matched vs Unmatched Symptoms     |
|                                    +----------------------------------------------+
|                                    | [CONTAINER 4: SPECIALIST NETWORK REFERRAL]   |
|                                    | (Width: Flex Auto, Height: 320px)            |
|                                    | - Worksheet: Specialist Mapping & Density    |
|                                    | - Actions: Hyperlink to Hyperlink API        |
+------------------------------------+----------------------------------------------+
```
