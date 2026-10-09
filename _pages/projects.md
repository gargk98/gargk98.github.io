---
layout: single
title: "Projects"
permalink: /projects/
author_profile: true
---

### Predicting Corporate Default: A Dynamic Logit Benchmark vs. Machine Learning

*with [Rajib Oraon](https://github.com/rajibor24)* · **[GitHub Repository](https://github.com/gargk98/credit-risk-default-prediction)** · **[Working Paper](https://github.com/gargk98/credit-risk-default-prediction/blob/main/paper/working_paper.pdf)**

Does a machine-learning model predict corporate default better than a strong, interpretable benchmark? We compare a dynamic logit and XGBoost on the same panel of U.S. public firms, tested on years the models never saw.

![Calibration over time: predicted PD vs. realized default rate](https://github.com/gargk98/credit-risk-default-prediction/raw/main/figures/calibration_time_series.png){: style="display: block; max-width: 600px; width: 100%;"}
*Predicted default probability against the realized default rate, by year. Both models track realized defaults closely in ordinary years and miss in opposite directions around 2008 and 2020.*

<div class="paper-toggles">
  <button type="button" class="paper-toggle" data-target="crd-details" aria-expanded="false">Details</button>
</div>

<div class="paper-panel" id="crd-details" markdown="1">
**The question:** Lenders and regulators use default models for two things: ranking firms by risk, and getting the probability of default right. We test whether a flexible machine-learning model (XGBoost) beats the standard, interpretable benchmark (a dynamic logit) on both.

**What we built:** A point-in-time panel of U.S. non-financial public firms from Compustat and CRSP (1980–2022, 157,556 firm-years) with no look-ahead bias. Both models are trained on data through 2005 and tested on three later windows.

**What we found:**

- Both models rank firms well (AUC-ROC about 0.90–0.93). XGBoost is slightly better, and its clearest edge is in picking out the rare firms that do default.
- Both get default probabilities about right in normal years but miss badly in crises, in opposite directions: about half too low in 2007–2008 and roughly ten times too high in 2020–2022.
- For credit risk teams, this means rankings are stable enough to screen on, but probability levels need to be monitored year by year, not just averaged over a test window.

**Skills used:** Python (scikit-learn, XGBoost) · WRDS (Compustat, CRSP) · class imbalance · probability calibration · out-of-time validation · Basel-style expected loss
</div>
