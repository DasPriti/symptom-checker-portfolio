# 🩺 Lead Healthcare UX/UI Design Specification & Architecture v3.0

**Project:** Medical Graph Symptom-to-Disease & Specialist Mapping Application  
**Role:** Lead Healthcare UX/UI Designer  
**Repository:** [DasPriti/symptom-checker-portfolio](https://github.com/DasPriti/symptom-checker-portfolio)  
**Live Demo:** [https://daspriti.github.io/symptom-checker-portfolio/](https://daspriti.github.io/symptom-checker-portfolio/)  
**Compliance Target:** WCAG 2.1 Level AA

---

## 1. Executive UX Strategy & Patient-Centered Ergonomics

Healthcare digital products operate under unique emotional and clinical constraints. Users accessing a symptom checker are frequently experiencing acute distress, anxiety, or physical discomfort. The primary UX goals are **reducing cognitive load**, **establishing immediate clinical trust**, **calculating explicit disease likelihood percentages**, and **delivering zero-friction specialist referral paths**.

```
┌─────────────────────────────────────────────────────────────┐
│                    HEALTHCARE UX TRIAGE FLOW                │
└─────────────────────────────────────────────────────────────┘
   [ Emergency Banner Alert (Red High-Contrast Top Sticky) ]
                             │
                             ▼
   [ Step 1: Symptom Selector ] ──► Auto-complete OR Anatomical Body Map
                             │
                             ▼
   [ Step 2: Diagnostic Match ] ──► Disease Likelihood Percentage Gauges
                             │
                             ▼
   [ Step 3: Specialist Consult ] ──► Ranked Specialist Badges & Telehealth Booking
```

---

## 2. Anatomical Selector & Dual Symptom Entry Modes

To accommodate both medical-literate users and patients describing vague physical sensations, the UX provides dual entry pathways:

1. **Auto-Complete Search Bar**: Substring fuzzy search across 655 clinical symptoms with real-time term highlighting (`<mark>`) and keyboard navigation (`ArrowUp/Down/Enter/Escape`).
2. **Anatomical Body Region Selector**: Visually categorized body regions:
   - 🧠 **Head & Neurological**: Headache, dizziness, vision changes, seizures, facial pain.
   - 🫁 **Chest & Respiratory**: Chest pain, shortness of breath, cough, palpitations, wheezing.
   - 🩺 **Abdomen & Digestive**: Sharp abdominal pain, nausea, vomiting, diarrhea, bloating.
   - 🦴 **Joints & Limbs**: Joint pain, knee pain, back pain, leg pain, swelling.
   - 🔥 **Skin & General**: Fever, fatigue, chills, skin rash, sweating.

---

## 3. Disease Likelihood Percentage Calculation Engine

To determine diagnostic rank, the engine calculates a weighted Jaccard & Coverage Index:

$$\text{Likelihood \%} = \left( \frac{|\text{Selected Symptoms} \cap \text{Disease Symptoms}|}{|\text{Disease Symptoms}|} \times 0.65 + \frac{|\text{Selected Symptoms} \cap \text{Disease Symptoms}|}{|\text{Selected Symptoms}|} \times 0.35 \right) \times 100\%$$

### Visual Score Gauge & Triage Matrix

| Correlation Range | Visual Gauge Color | Contrast Token | Clinical Triage Level |
| :--- | :--- | :--- | :--- |
| **75% – 100%** | Emerald Circle Gauge (`#10B981`) | 7.2:1 | 🚨 High Likelihood / Emergency Triage |
| **45% – 74%** | Amber Circle Gauge (`#F59E0B`) | 5.8:1 | ⚠️ Moderate Likelihood / Specialist Consult |
| **15% – 44%** | Slate Circle Gauge (`#94A3B8`) | 4.9:1 | ℹ️ Low Likelihood / Primary Care |

---

## 4. Dual View Modes: Card View vs Differential Matrix View

Users can seamlessly toggle between two distinct clinical presentation modes:

1. **Diagnostic Card View**: High-contrast card featuring a circular percentage gauge, severity badge, matched vs unmatched symptom breakdown, recommended specialist chips, and telehealth booking CTA.
2. **Differential Comparison Matrix**: A side-by-side comparison table contrasting condition likelihood percentages, matched symptom overlap, assigned specialist type, and direct booking actions.

---

## 5. Telehealth Consultation & Specialist Booking Modal Flow

Clicking **"Book Specialist Consult"** triggers a pre-filled clinical referral modal containing:
- Selected Patient Symptoms
- Target Disease Condition & Calculated Likelihood Percentage
- Mapped Specialist Type (`Cardiologist`, `Endocrinologist`, `Neurologist`, etc.)
- Preferred Date Picker & Confirmation Action

---

## 6. Accessibility Audit & Compliance Matrix (WCAG 2.1 AA)

| Requirement | WCAG Guideline | Implementation Detail |
| :--- | :--- | :--- |
| **Contrast Ratio** | 1.4.3 Contrast (Minimum) | Title/Body text >= 4.5:1. Primary Cyan (`#00D2D3`) on Dark Blue (`#0B132B`) is **9.4:1**. |
| **Touch Targets** | 2.5.5 Target Size | All buttons, chips, and tag removal controls maintain min height of **48px**. |
| **Focus Visible** | 2.4.7 Focus Visible | 3px high-visibility cyan outline (`#00D2D3`) with 2px offset on keyboard `:focus-visible`. |
| **Dynamic Updates** | 4.1.3 Status Messages | Diagnostic results container marked with `aria-live="polite"` for screen readers. |
| **Search Semantics** | 4.1.2 Name, Role, Value | Input includes `aria-autocomplete="list"`, `aria-controls="suggestions-dropdown"`, `aria-expanded`. |
