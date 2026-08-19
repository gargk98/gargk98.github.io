---
layout: single
title: "Research & Projects"
permalink: /research/
author_profile: true
---

## Working Papers

### Belief Stabilization and the Flood Insurance Gap: Evidence from the National Flood Insurance Program

I construct a novel large-scale panel of NFIP flood insurance policies from 2009--2019 (~70 million observations), enabling tracking of individual policyholders over time. I document heterogeneous renewal and cancellation behavior by flood-risk exposure and policy tenure, and develop a Bayesian belief-updating framework with attention to study repeated insurance decisions.

---

### Corporate Board Management and Greenhouse Gas Emissions *(with coauthors)*

We examine how mandatory environmental disclosure affects board composition by exploiting a regulatory reporting shock. We construct merged administrative and governance datasets and apply Synthetic DiD methods, while exploring potential implications for director compensation.

---

## Projects

### Predicting Corporate Default: A Dynamic Logit Benchmark vs. Machine Learning

**[GitHub Repository](https://github.com/gargk98/credit-risk-default-prediction) · [Working Paper](https://github.com/gargk98/credit-risk-default-prediction/blob/main/paper/working_paper.pdf)**

*Joint work with [Rajib Oraon](https://github.com/rajibor24)*

**Tools:** Python · scikit-learn · XGBoost · lifelines · WRDS (Compustat, CRSP)

Does a flexible machine-learning model actually improve corporate default prediction over a strong, interpretable benchmark? This project builds a point-in-time firm-year panel of U.S. non-financial public firms (Compustat + CRSP, 1980–2022) and runs a like-for-like horse race between a **dynamic logit** (discrete-time hazard) model and an **XGBoost** classifier — same panel, same features, same outcome — under a genuine out-of-time evaluation.

**Headline result:** ranking and calibration come apart, but not on a calendar. XGBoost ranks slightly better throughout. Both models are well-calibrated in ordinary years but fail in *opposite directions* during two macro-shock episodes — under-predicting defaults by about half in 2007–2008, and over-predicting them by roughly an order of magnitude in 2020–2022.

![Calibration over time: predicted PD vs. realized default rate](https://github.com/gargk98/credit-risk-default-prediction/raw/main/figures/calibration_time_series.png)
*Predicted and realized default rates track closely for most of the sample and separate sharply at two points — falling below realized defaults around the financial crisis, then rising well above them in the pandemic years.*

**Key findings:**

- Discrimination is strong but the edge is narrow — out-of-sample AUC-ROC is ~0.90–0.93 for both models; a DeLong test finds XGBoost's edge statistically significant only in the one window with no macro shock (2011–2015, *p* = 0.001)
- XGBoost's clearest, most consistent advantage is rare-event ranking (AUC-PR), running roughly an order of magnitude above the no-skill baseline in every window
- Calibration fails only around macro shocks — clean across twelve ordinary years, breaking down sharply in 2007–2008 and 2020–2022, in opposite directions and for different reasons
- The logit trails on AUC-PR but stays economically legible, with signed, standard-error-backed marginal effects that the tree ensemble doesn't provide

**Methodology:** point-in-time panel construction with no look-ahead bias, out-of-time evaluation across three non-overlapping forward windows (2006–2010, 2011–2015, post-2015), standard errors clustered by firm, DeLong tests for model comparison, Platt-scaled calibration, and a Basel-style expected-loss bridge (PD × EAD × LGD).

Full write-up, code, and reproduction instructions are in the [repo README](https://github.com/gargk98/credit-risk-default-prediction).
