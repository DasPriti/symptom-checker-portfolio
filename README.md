# 🏥 MediGraph - Medical Symptom Checker & Specialist Analytics Portfolio

**Portfolio Author:** Priti Das  
[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Design%20Demo-Click%20Here-00D2D3?style=for-the-badge&logo=github)](https://daspriti.github.io/symptom-checker-portfolio/)
[![UX Specification](https://img.shields.io/badge/📄%20UX%20Design%20Doc-View%20Specification-0284C7?style=for-the-badge)](UX_DESIGN_SPECIFICATION.md)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-success.svg?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)

---

## 📈 1. Custom Tableau & Power BI Dashboard Screenshots (by Priti Das)

### A. Tableau Desktop Dashboard Layout (1440x900 Grid)
*Designed and authored by **Priti Das** for enterprise healthcare analytics in Tableau Desktop / Tableau Server:*

![Tableau Desktop Analytics Dashboard - Priti Das](assets/tableau_dashboard_design.jpg)

### B. Power BI Executive Service Analytics Dashboard
*Authored by **Priti Das** featuring clinical symptom correlation heatmaps, patient severity gauges, specialist referral network pie charts, and triage KPIs:*

![Power BI Analytics Dashboard - Priti Das](assets/powerbi_dashboard_design.jpg)

---

## 🚀 **Direct Live Interactive Web App Link:**
👉 **[https://daspriti.github.io/symptom-checker-portfolio/](https://daspriti.github.io/symptom-checker-portfolio/)**

---

## 🎨 2. Healthcare UX/UI Design Portfolio Showcase (7 Designs)

### Design 1: Clinical Symptom Correlation Matrix & Heatmap
![Clinical Symptom Correlation Matrix UI](assets/design_1_correlation_matrix.jpg)

### Design 2: Specialist Referral Network & Provider Map
![Specialist Referral Network UI](assets/design_2_specialist_network.jpg)

### Design 3: Patient Triage & Emergency Severity Dashboard
![Patient Triage Severity Dashboard UI](assets/design_3_triage_analytics.jpg)

### Design 4: Differential Diagnosis Comparison Board
![Differential Diagnosis Comparison Board UI](assets/design_4_differential_comparison.jpg)

### Design 5: Patient EHR Telehealth Consultation Summary Report
![Patient EHR Telehealth Consultation Report UI](assets/design_5_patient_ehr_report.jpg)

---

## ✨ System Features & Architecture

- **🔍 Dual Symptom Entry**: Auto-complete search across 655+ symptoms + Anatomical Body Area Selector Map.
- **📊 Disease Likelihood Percentage Engine**: Weighted Jaccard coverage formula ($75\%+$ High, $45-74\%$ Moderate, $<45\%$ Low).
- **👨‍⚕️ Specialist Recommendation Hierarchy**: Direct mapping of specialists (`Cardiologist`, `Endocrinologist`, `Neurologist`, `Pulmonologist`).
- **📈 Dataset Analytics Suite**: Interactive charts analyzing specialist frequencies, symptom occurrences, and searchable dataset explorer table.
- **🎨 3 Design Systems Included**: Toggle between **Dark Slate**, **Clinical Light Teal**, and **High Contrast (WCAG AAA)** themes.

---

## 🧮 Diagnostic Likelihood Formula

$$\text{Likelihood \%} = \left( \frac{|\text{Selected Symptoms} \cap \text{Disease Symptoms}|}{|\text{Disease Symptoms}|} \times 0.65 + \frac{|\text{Selected Symptoms} \cap \text{Disease Symptoms}|}{|\text{Selected Symptoms}|} \times 0.35 \right) \times 100\%$$

---

## 📄 Project Files & Documentation

- 🌐 **Live Web Application Demo:** [https://daspriti.github.io/symptom-checker-portfolio/](https://daspriti.github.io/symptom-checker-portfolio/)
- 🎨 **Lead Healthcare UX Design Spec:** [UX_DESIGN_SPECIFICATION.md](UX_DESIGN_SPECIFICATION.md)
- 🖼️ **Tableau Dashboard Screenshot:** [`assets/tableau_dashboard_design.jpg`](assets/tableau_dashboard_design.jpg)
- 🖼️ **Power BI Dashboard Screenshot:** [`assets/powerbi_dashboard_design.jpg`](assets/powerbi_dashboard_design.jpg)

---

## 📄 License
MIT License - see [LICENSE](LICENSE) for details.
