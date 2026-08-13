# 🏥 MediGraph - Mobile-First Medical Symptom Checker & Disease Likelihood UX Engine

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Design%20Demo-Click%20Here-00D2D3?style=for-the-badge&logo=github)](https://daspriti.github.io/symptom-checker-portfolio/)
[![UX Specification](https://img.shields.io/badge/📄%20UX%20Design%20Doc-View%20Specification-0284C7?style=for-the-badge)](UX_DESIGN_SPECIFICATION.md)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-success.svg?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)

**MediGraph** is a high-fidelity, mobile-first healthcare web application and UX design system that maps patient symptoms to clinical conditions, calculates disease likelihood percentages, and recommends specialized physicians.

---

## 🎨 Visual UI Design Showcase

### 1. Mobile Smartphone Symptom Checker Interface
Features high-contrast emergency triage banner, auto-complete search widget, interactive symptom tag pills, and ranked diagnostic probability cards.

![Mobile Symptom Checker UI Design](assets/mobile_ui_design.jpg)

---

### 2. Diagnostic Summary Card & Correlation Dashboard
Displays circular likelihood percentage progress gauges ($88\%$, $75\%$, $45\%$), matching symptom overlap badges, recommended specialist chips, and telehealth booking CTAs.

![Diagnostic Summary Dashboard Design](assets/diagnostic_dashboard_design.jpg)

---

## 🚀 **Direct Live Interactive Design URL:**
👉 **[https://daspriti.github.io/symptom-checker-portfolio/](https://daspriti.github.io/symptom-checker-portfolio/)**

---

## ✨ Design Architecture & Features

- **🔍 Dual Symptom Entry**: Auto-complete fuzzy search across 655+ symptoms + Anatomical Body Area Selector Map (Head, Chest, Abdomen, Limbs, Skin).
- **📊 Disease Likelihood Percentage Engine**: Weighted coverage formula calculating probability scores (High $\ge 75\%$, Moderate $45-74\%$, Low $<45\%$).
- **👨‍⚕️ Specialist Recommendation Hierarchy**: Direct mapping of specialists (`Cardiologist`, `Endocrinologist`, `Neurologist`, `Pulmonologist`, etc.).
- **📊 Dual Presentation Modes**: Switch between Diagnostic Card View and Differential Comparison Matrix Table.
- **🎨 3 Design Systems Included**: Toggle between **Deep Slate Dark**, **Clinical Light Teal**, and **High Contrast Accessibility** themes.
- **♿ WCAG 2.1 AA Compliant**: High contrast colors ($9.4:1$), 48px touch targets, keyboard `:focus-visible` outlines, and ARIA screen reader support.

---

## 🧮 Diagnostic Likelihood Formula

$$\text{Likelihood \%} = \left( \frac{|\text{Selected Symptoms} \cap \text{Disease Symptoms}|}{|\text{Disease Symptoms}|} \times 0.65 + \frac{|\text{Selected Symptoms} \cap \text{Disease Symptoms}|}{|\text{Selected Symptoms}|} \times 0.35 \right) \times 100\%$$

---

## 📄 Project Files & UX Specification

- 🌐 **Live Web Application Demo:** [https://daspriti.github.io/symptom-checker-portfolio/](https://daspriti.github.io/symptom-checker-portfolio/)
- 🎨 **Lead Healthcare UX Design Spec:** [UX_DESIGN_SPECIFICATION.md](UX_DESIGN_SPECIFICATION.md)
- 🖼️ **Visual UI Assets:** [`assets/mobile_ui_design.jpg`](assets/mobile_ui_design.jpg) & [`assets/diagnostic_dashboard_design.jpg`](assets/diagnostic_dashboard_design.jpg)
- 📊 **Source Code:** [`index.html`](index.html), [`style.css`](style.css), [`app.js`](app.js), [`data.js`](data.js)

---

## 📄 License
MIT License - see [LICENSE](LICENSE) for details.
