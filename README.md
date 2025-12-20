# SugarDashBoard 🍰

![Project Cover](docs/Copertina.png)

![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)
[![bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](LICENSE)
![css](https://img.shields.io/badge/CSS-663399.svg?style=for-the-badge&logo=CSS&logoColor=white)
![gemini](https://img.shields.io/badge/Gemini-8E75B2.svg?style=for-the-badge&logo=Google-Gemini&logoColor=white)
![claude](https://img.shields.io/badge/Claude-D97757.svg?style=for-the-badge&logo=Claude&logoColor=white)
![copilot](https://img.shields.io/badge/GitHub%20Copilot-000000.svg?style=for-the-badge&logo=GitHub-Copilot&logoColor=white)
![overleaf](https://img.shields.io/badge/Overleaf-47A141.svg?style=for-the-badge&logo=Overleaf&logoColor=white)
[![License](https://img.shields.io/badge/MIT-green?style=for-the-badge)](LICENSE)

**SugarDashBoard** is a professional, interactive web-based dashboard designed to analyze and visualize the sales, distribution, and cultural heritage of Italian desserts (*dolci*).

This project was developed as a case study in **Generative AI** and **Prompt Engineering**, specifically exploring how advanced LLMs (Claude 4.5 Opus and Gemini 3.0 Pro) can be utilized to accelerate frontend development and data visualization workflows.


## 🚀 Features

The dashboard combines quantitative business intelligence with qualitative cultural storytelling:

*   **📊 Analytic Dashboard:**
    *   **KPI Tracking:** Real-time monitoring of total sales, revenue, and order volumes.
    *   **Sales Trends:** Interactive charts showing monthly revenue trends across the entire fiscal year.
    *   **Product Performance:** Ranked lists of best-selling desserts with regional color-coding for immediate recognition (e.g., Red for Sicily, Blue for Veneto).
    *   **Ingredient Analysis:** Distribution of most frequently used ingredients in production.

*   **🗺️ Interactive Cartography:**
    *   A fully interactive map of Italy (powered by **Leaflet.js**) displaying the geographic origin of each dessert.
    *   Proportional markers indicate the density of dessert varieties per region.

*   **🖼️ Regional Showcase ("Vetrina"):**
    *   A visual gallery celebrating Italian culinary biodiversity.
    *   Detailed cards for regional specialties (e.g., Cannolo, Tiramisù, Panettone) with high-quality generative imagery.

## 🛠️ Technology Stack

The project adheres to a clean, standard-based architecture without heavy frontend frameworks:

*   **Core:** HTML5, CSS3, JavaScript (ES6+)
*   **Visualization:** [Chart.js](https://www.chartjs.org/) for analytics.
*   **Mapping:** [Leaflet.js](https://leafletjs.com/) for geographic data.
*   **Icons:** FontAwesome.
*   **Fonts:** Google Fonts (Inter, Roboto).

## 🤖 Generative AI Methodology

The development process followed an **iterative prompt engineering** approach, documented in `prompts progetto.txt`. The goal was to refine the dashboard through successive iterations:

1.  **Structure Definition:** Establishing the grid layout and entity-relationship schema.
2.  **Geographic Implementation:** Integrating map visualizations for regional analysis.
3.  **Refinement:** Improving map accuracy using external vector libraries.
4.  **Temporal Extension:** Expanding analytics from 6 months to a full year.
5.  **Stylistic Polish:** Applying chromatic categorization (regional color coding) to charts.

### Model Comparison
The project compares outputs between:
*   **Anthropic Claude 4.5 Opus:** Used for the primary development and logic.
*   **Google Gemini 3.0 Pro:** Used for comparative analysis (outputs available in `confronto*.html` files).

## 📂 Project Structure

```
SugarDashBoard/
├── index.html            # Main dashboard entry point (Final Version)
├── css/                  # Stylesheets
├── js/                   # Application logic and data
│   ├── data.js           # JSON-like data structures for desserts/sales
│   └── main.js           # Chart initialization and UI logic
├── images/               # Dessert assets (partially AI-generated)
├── confronto[1-4].html   # Intermediate/Comparative outputs from Gemini
├── prompts progetto.txt  # Log of prompts used for generation
├── Data_Science_Generative.pdf # Full project report
└── README.md             # Project documentation
```

## 📦 Usage

Since this is a static web application, no build process is required.

1.  Clone the repository or download the source code.
2.  Open `index.html` in any modern web browser.

## 📄 License

This project is released for educational and academic purposes.