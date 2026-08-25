---
layout: single
title: "Research & Projects"
permalink: /research/
author_profile: true
---

## Working Papers

### Belief Stabilization and the Flood Insurance Gap: Evidence from the National Flood Insurance Program

This project studies how households form and revise beliefs about flood risk when deciding whether to renew flood insurance. I use OpenFEMA's redacted NFIP policy data, a panel of over 67 million flood insurance policies issued between 2009 and 2023, which I link into individual policy histories despite the absence of a native tracking ID. I document a systematic pattern in renewal behavior: new policyholders in Census Block Groups that experience a nearby flood claim cancel their coverage less often than new policyholders in unaffected areas. This gap narrows steadily with tenure and is essentially gone by year seven or eight of holding a policy (see the cancellation-rate-by-tenure graph below).

![Cancellation rate by tenure](/images/flood_cancellation_by_tenure.png)
*Cancellation rate by tenure, for policyholders in Census Block Groups with a nearby flood claim versus unaffected areas.*

I interpret this as belief updating that stabilizes with experience: households learn from local flood signals early on, but their responsiveness to new information declines as tenure accumulates, consistent with the rational inattention literature (Sims 2003; Gabaix 2014). A competing, purely mechanical explanation is also possible: a fixed population of households who never update and simply outlast the more responsive ones could produce the same decaying gap through composition alone, without any individual actually learning anything. To distinguish the two, I am building a structural model of belief formation and insurance renewal that allows for two types of households, one whose beliefs never move and one that updates as in the baseline model, and estimating how much of the pattern in the data reflects genuine learning versus this kind of survivorship.

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