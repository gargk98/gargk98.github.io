---
layout: single
title: "Research"
permalink: /research/
author_profile: true
---

### Belief Stabilization and the Flood Insurance Gap: Evidence from the National Flood Insurance Program

*Job Market Paper* · **[Latest draft (PDF)](https://www.dropbox.com/scl/fi/k3u7i3tce3us06gh6t01w/GARG_JMP.pdf?rlkey=n2ilhsh52ana9alnhvgx1jk1q&raw=1)**

![Claim gap by policy tenure](/images/claim_gap_by_tenure.png){: style="display: block; max-width: 440px; width: 100%;"}
*The claim gap by policy tenure: how much less often policyholders cancel when their census block group had a flood claim during the policy term, in percentage points. The shaded band is a 95 percent confidence interval.*

<div class="paper-toggles">
  <button type="button" class="paper-toggle" data-target="jmp-abstract" aria-expanded="false">Abstract</button>
  <button type="button" class="paper-toggle" data-target="jmp-details" aria-expanded="false">Details</button>
</div>

<div class="paper-panel" id="jmp-abstract" markdown="1">
I study how local flood experience affects a household’s decision to keep flood insurance, using a panel of National Flood Insurance Program policies that I link across fifteen years of OpenFEMA records and match to every flood insurance claim. New policyholders whose census block group has a flood claim during the policy term cancel 3.2 percentage points less often than those whose block group does not, or 1.6 points when comparing households within the same block group. This claim gap falls with tenure and is close to zero after about seven years. I estimate a model in which households update their beliefs about flood risk after a neighbor’s claim, with a weight that falls with tenure. At the estimates the weight falls to about a fifth of its first-year value over ten years of coverage, and changes in which households stay insured explain little of the decline in the claim gap. In the estimated model, the households still insured at long tenure mostly overestimate their risk, and removing the decline in the weight barely changes coverage. Beliefs at entry matter much more. Correct entry beliefs, or information about flood risk delivered in the first two years of coverage, raise coverage by about 30 insured years per hundred entrants over ten years, while the same information delivered at long tenure slightly lowers it. Efforts to close the flood insurance gap should reach households in their first years of coverage.
</div>

<div class="paper-panel" id="jmp-details" markdown="1">
**Question:** Flood insurance in the US is renewed one year at a time, and take-up is low and falling, which is what the literature calls the flood insurance gap. I ask when, how, and to what extent a household's local flood experience affects its decision to cancel.

**Data:** The OpenFEMA NFIP Redacted Policies dataset has over 67 million policy records for 2009 to 2023, with each renewal a separate record and no identifier linking a policy across years. I stitch renewals together using property construction dates, initial policy start dates, and census block group identifiers, recovering about 92 percent of all policies, and match every flood insurance claim to the coverage window of the policy it falls inside. The analysis covers voluntary policyholders (those not required by a lender to hold coverage) from 2011 to 2019: 24.8 million policy-years from 6.46 million policies in 183,038 block groups.

**Three facts:**

- Among first-year policyholders, those whose block group had a flood claim during the policy term cancel at 19.0 percent, against 22.2 percent for those whose block group did not. Almost all of these claims are filed by someone else in the block group. Comparing households within the same block group, the gap is 1.6 points.
- The claim gap falls with tenure, to under one point by tenure six and close to zero from tenure seven onward.
- Whether or not their block group had a claim, new policyholders cancel more often than long-tenure policyholders.

**Two explanations:** A new policyholder is unsure about its risk, so a neighbor's flood is informative and it updates strongly. As coverage accumulates, beliefs harden and each new signal gets less weight, as rational inattention models predict (Sims 2003; Gabaix 2014). Survivorship could produce the same pattern: if some households never respond to flood signals and rarely cancel, the responders leave first and the gap shrinks even though no household changes how it updates.

**Model:** Households enter with a belief about their flood risk, see each year whether a neighbor filed a claim, and move their belief toward that signal by a weight that declines with tenure. They renew when coverage is worth its premium given their belief. I estimate the model by simulated method of moments on the cancellation rate and the claim gap at each tenure from one to ten. The weight on a neighbor's claim falls to about a fifth of its first-year value over ten years of coverage. A version in which the decline comes only from which households stay insured fits twice as badly, and adding a group of households who never update does not improve the fit, which points to updating that fades with tenure.

**What it means for policy:**

- Fading responsiveness barely matters for coverage. Removing it lowers coverage by only 0.1 insured years per hundred entrants over ten years.
- Beliefs at entry matter much more. With correct beliefs at entry, the share of entrants still insured after ten years rises from 33.8 to 36.2 percent, or 30 insured years per hundred entrants. By tenure ten, 72 percent of the households still insured believe their risk is higher than it is.
- Information about a block group's flood risk delivered in the first two years of coverage produces about the same gain, while the same information delivered from tenure six onward slightly lowers coverage. About one in five cancellations in the model is a lapse the household would not make if it knew its block group's flood probability, and early information removes nearly all of them.
- The size of these gains depends on how spread out entry beliefs are, which is imprecisely estimated.
</div>

---

### The Impact of Greenhouse Gas Reporting Requirements on Corporate Board Membership *(work in progress)*

*with [Dakshina De Silva](https://sites.google.com/view/dakshinadesilva/home), [Eric Lewis](https://sites.google.com/site/erickylelewis/home), and [Aurelie Slechten](https://sites.google.com/site/aurelieslechten/)*

We study whether firms facing a new disclosure mandate bring in the expertise to comply by changing who sits on their boards.
