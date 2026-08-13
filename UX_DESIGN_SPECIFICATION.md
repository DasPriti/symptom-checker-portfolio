# 🩺 Lead Healthcare UX/UI Design Specification & Architecture v4.0

**Project:** Medical Graph Symptom-to-Disease & Specialist Mapping Application  
**Role:** Lead Healthcare UX/UI Designer  
**Repository:** [DasPriti/symptom-checker-portfolio](https://github.com/DasPriti/symptom-checker-portfolio)  
**Live Demo:** [https://daspriti.github.io/symptom-checker-portfolio/](https://daspriti.github.io/symptom-checker-portfolio/)  
**Compliance Target:** WCAG 2.1 Level AA

---

## 🎨 Visual Design Portfolio Gallery (7 Designs)

This portfolio project includes **7 distinct visual UI design screens and clinical dashboard architectures**:

| Design | Screen / Interface Name | Key UX & Visual Highlights |
| :--- | :--- | :--- |
| **Design 1** | **Clinical Symptom Correlation Matrix & Heatmap** | Interactive correlation density heatmap matrix mapping disease rows vs symptom columns with emerald-to-cyan heat intensity gradients. |
| **Design 2** | **Specialist Referral Network & Provider Map** | Network node graph linking medical specialties (`Cardiologist`, `Endocrinologist`, `Neurologist`) with provider wait-time cards and booking CTAs. |
| **Design 3** | **Patient Triage & Emergency Severity Dashboard** | Executive clinical dashboard featuring severity donut charts (Emergency vs Urgent vs Routine), active alert logs, and response velocity gauges. |
| **Design 4** | **Differential Diagnosis Comparison Board** | Multi-column side-by-side comparison board allowing clinicians to contrast 3 conditions, matching symptom checkmarks, and specialist badges. |
| **Design 5** | **Patient EHR Telehealth Consultation Report** | Digital clinical consultation summary document with patient demographics, symptom history, likelihood percentages, and digital physician signature. |
| **Design 6** | **Mobile Smartphone Symptom Checker UI** | Mobile-first smartphone interface with emergency triage banner, auto-complete search widget, tag pills, and likelihood cards. |
| **Design 7** | **Diagnostic Summary Card & Percentage Gauge** | Card view featuring circular percentage progress gauges ($88\%$, $75\%$, $45\%$), matched vs unmatched symptom pills, and specialist chips. |

---

## 📈 Medical Dataset Analytics Dashboard

The application features a built-in Dataset Analytics Dashboard analyzing the underlying medical graph dataset:
- **50 Unique Disease Conditions**
- **655 Clinical Symptoms Mapped**
- **80+ Medical Specialist Roles**
- **28.4 Average Symptoms per Disease**

### Data Analytics Visualizations:
1. **Specialist Distribution Bar Chart**: Ranks specialist frequency (`Cardiologist`, `Endocrinologist`, `Neurologist`, `Pulmonologist`, `Gastroenterologist`, etc.).
2. **Symptom Occurrence Frequency Chart**: Identifies top clinical indicators across the dataset (`chest pain`, `shortness of breath`, `fever`, `cough`, `dizziness`, `fatigue`, `nausea`).
3. **Searchable Dataset Explorer Table**: Live search and filter table allowing users to explore all 50 diseases, assigned specialists, symptom counts, and characteristic signs.

---

## 🧮 Disease Likelihood Percentage Formula

$$\text{Likelihood \%} = \left( \frac{|\text{Selected Symptoms} \cap \text{Disease Symptoms}|}{|\text{Disease Symptoms}|} \times 0.65 + \frac{|\text{Selected Symptoms} \cap \text{Disease Symptoms}|}{|\text{Selected Symptoms}|} \times 0.35 \right) \times 100\%$$

---

## ♿ WCAG 2.1 AA Accessibility Audit Matrix

| Requirement | WCAG Guideline | Implementation Detail |
| :--- | :--- | :--- |
| **Contrast Ratio** | 1.4.3 Contrast (Minimum) | Title/Body text >= 4.5:1. Primary Cyan (`#00D2D3`) on Dark Blue (`#0B132B`) is **9.4:1**. |
| **Touch Targets** | 2.5.5 Target Size | All buttons, chips, and tag removal controls maintain min height of **48px**. |
| **Focus Visible** | 2.4.7 Focus Visible | 3px high-visibility cyan outline (`#00D2D3`) with 2px offset on keyboard `:focus-visible`. |
| **Dynamic Updates** | 4.1.3 Status Messages | Diagnostic results container marked with `aria-live="polite"` for screen readers. |
| **Search Semantics** | 4.1.2 Name, Role, Value | Input includes `aria-autocomplete="list"`, `aria-controls="suggestions-dropdown"`, `aria-expanded`. |
