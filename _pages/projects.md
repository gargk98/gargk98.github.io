---
layout: single
title: "Projects"
permalink: /projects/
author_profile: true
---

## Corporate Default Risk: A Quantitative Framework

**[GitHub Repository](#)** *(link coming soon)* · **[Working Paper](#)** *(coming soon)*

**Tools:** Python · scikit-survival · XGBoost · SHAP · DoubleML · WRDS (Compustat, CRSP)

This project builds an end-to-end corporate credit risk framework using public firm-level data, benchmarking traditional survival models against machine learning approaches and applying causal inference to identify structural drivers of default.

**Data:** Merged Compustat and CRSP panel (firm × year), following Campbell, Hilscher & Szilagyi (2008). Default events defined via CRSP delisting codes for Chapter 7/11 filings. Features include both accounting-based predictors (leverage, interest coverage, ROA, current ratio) and market-based predictors (market leverage, trailing equity returns, rolling volatility, Merton Distance-to-Default).

**Methodology:**

- **Cox Proportional Hazards** (baseline) — models time-to-default explicitly; estimates 1, 2, and 3-year default probabilities
- **Random Survival Forest + XGBoost** — benchmarked against Cox on concordance index and Brier score; three-way horse race includes Merton structural model as canonical benchmark
- **Out-of-time validation** — trained on pre-2005 data, tested on 2005–2010 to stress-test generalization through the financial crisis
- **SHAP explainability** — global feature importance and individual waterfall plots decomposing firm-level default probability into per-variable contributions
- **Double ML (Chernozhukov et al.)** — estimates causal effect of leverage on default hazard, partialling out confounders to quantify bias in the naive Cox coefficient

**Extensions (time-permitting):** Credit-to-equity alpha signal (long-short portfolio based on model-implied PD deterioration); macro stress testing calibrated to 2008 recession scenarios (CCAR/DFAST framework).
