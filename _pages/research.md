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
**The question:** Many homeowners at risk of flooding go without flood insurance or give it up. I study how a flood claim in a household's neighborhood affects its decision to renew.

**What I built:** A fifteen-year panel that follows individual policies through over 67 million FEMA records, which have no ID linking a policy from one year to the next, matched to every flood insurance claim.

**What I found:**

- New policyholders whose neighborhood had a flood claim cancel 3.2 percentage points less often. The effect fades the longer a household has been insured and is gone after about seven years.
- In a model of how households update their beliefs, estimated on this data, what they believe when they first buy matters much more than how quickly their response to new floods fades.
- In the model, accurate flood-risk information in the first two years of coverage adds about 30 insured years per hundred new policyholders over ten years, while the same information given later slightly lowers coverage.

**Skills used:** record linkage at scale · structural modeling (simulated method of moments) · policy simulation · Python, SQL
</div>

---

### The Impact of Greenhouse Gas Reporting Requirements on Corporate Board Membership *(work in progress)*

*with [Dakshina De Silva](https://sites.google.com/view/dakshinadesilva/home), [Eric Lewis](https://sites.google.com/site/erickylelewis/home), and [Aurelie Slechten](https://sites.google.com/site/aurelieslechten/)*

We study whether firms facing a new disclosure mandate bring in the expertise to comply by changing who sits on their boards.
