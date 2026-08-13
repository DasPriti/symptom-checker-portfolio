# 🏥 MediGraph - Mobile-First Medical Symptom Checker & Specialist Recommendation Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-success.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![UX Specification](https://img.shields.io/badge/UX%20Design-Specification%20Document-00D2D3.svg)](UX_DESIGN_SPECIFICATION.md)

**MediGraph** is a high-fidelity, mobile-first healthcare web application and UX prototype that maps patient-selected symptoms to medical conditions and recommends specialized physicians based on clinical correlation scoring. Built with responsive layout ergonomics, glassmorphism UI aesthetics, and strict WCAG 2.1 AA accessibility standards.

---

## 🎨 UX/UI Design Specification Document

> 📄 **[Read the Full Lead Healthcare UX/UI Design Specification & Wireframe Blueprint](UX_DESIGN_SPECIFICATION.md)**
>
> Includes:
> - **Mobile Ergonomics & Thumb Zone Mapping**
> - **Interactive Symptom Selector Widget Specs**
> - **Diagnostic Summary Card Information Architecture**
> - **Mathematical Correlation Scoring Formula**
> - **WCAG 2.1 AA Accessibility Audit Matrix**
> - **Tableau Dashboard Layout Specification (1440x900 Grid)**

---

## ✨ Features

- **🔍 Interactive Symptom Selector Widget**:
  - Auto-complete search engine filtering across 655+ clinical symptoms in real time.
  - Substring matching with dynamic text highlighting (`<mark>`).
  - Full keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`).
  - Interactive tag pills with instant removal and one-tap popular quick-chips (`chest pain`, `shortness of breath`, `fever`, `dizziness`, etc.).

- **📊 Differential Diagnostic Summary Cards**:
  - Weighted Jaccard & Coverage Index mathematical correlation engine.
  - Color-coded progress gauge (High $\ge 70\%$ Emerald, Moderate $40-69\%$ Amber, Low $<40\%$ Slate).
  - Explicit Triage & Severity classification (*Emergency/Urgent*, *Specialist Referral*, *Primary Care*).
  - Transparent breakdown of matching vs additional disease symptoms.

- **👨‍⚕️ Specialist Recommendation Hierarchy**:
  - Direct mapping of primary and secondary medical specialists per condition (Cardiologist, Endocrinologist, Neurologist, Pulmonologist, etc.).
  - Actionable CTAs for specialist location lookup and condition details.

- **♿ WCAG 2.1 AA Accessibility Audit Compliant**:
  - Color contrast ratios exceeding 4.5:1 (Primary Cyan `#00D2D3` on `#0B132B` achieves **9.4:1** contrast).
  - Min 48x48px touch targets for mobile ergonomics.
  - High-visibility keyboard `:focus-visible` outlines.
  - `aria-live="polite"` dynamic region updates for screen readers.

- **🖥️ Dual Viewport & Tableau Specification Overlay**:
  - Toggle between Mobile Smartphone Container View and Expanded Desktop / Tableau Dashboard view.
  - Includes full Tableau Dashboard Container Spec for enterprise analytics integration.

---

## 🧮 Diagnostic Correlation Formula

$$\text{Match \%} = \left( \frac{|\text{Selected Symptoms} \cap \text{Disease Symptoms}|}{|\text{Disease Symptoms}|} \times 0.65 + \frac{|\text{Selected Symptoms} \cap \text{Disease Symptoms}|}{|\text{Selected Symptoms}|} \times 0.35 \right) \times 100\%$$

---

## 🚀 Quick Start & Local Preview

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DasPriti/symptom-checker-portfolio.git
   cd symptom-checker-portfolio
   ```

2. **Serve locally**:
   ```bash
   python -m http.server 8080
   ```

3. Open your browser at `http://localhost:8080`.

---

## 🛠️ Project Structure

```
├── index.html                  # Main HTML5 viewport, mobile frame, & Tableau spec view
├── style.css                   # Custom design system tokens, themes, & responsive layouts
├── app.js                      # Auto-complete, tag manager, & correlation engine logic
├── data.js                     # Processed medical dataset (50 diseases, 655 symptoms)
├── dataset.csv                 # Source medical graph CSV data
├── UX_DESIGN_SPECIFICATION.md  # Detailed Lead Healthcare UX/UI design blueprint
└── README.md                   # Project portfolio overview
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
