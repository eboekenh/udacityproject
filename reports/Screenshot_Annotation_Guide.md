# Dashboard Screenshot & Annotation Guide

This guide lists exactly which visuals to screenshot on each of the 3 dashboard sheets, and what to write as the annotation for each one (specific number + business meaning + suggested action), per the submission checklist. Screenshots themselves need to be captured directly from your QuickSight session (Dashboards → NovaTech Revenue Intelligence Dashboard) since they must come from your own browser session — use Cmd+Shift+4 / Snipping Tool, then add a text box or arrow in Preview/PowerPoint/Paint using the annotation text below.

## Marketing Funnel sheet

1. **Visual: "Sum of Revenue_attributed by Campaign_channel"**
   Number: Partner Referral ≈ $680K, more than 3x the next channel.
   Meaning: Partner Referral is the single largest revenue-attributed channel.
   Action: Protect/expand Partner Referral budget before other channels.

2. **Visual: "Average of Campaign_response by Campaign_channel"**
   Number: Direct Mail ≈ 0.49 average response, the highest of all 5 channels.
   Meaning: Direct Mail converts leads most efficiently per lead sent, even though its volume is small.
   Action: Pilot a modest increase in Direct Mail spend/volume to test if efficiency holds at scale.

3. **Visual: "Sum of Campaign_spend and Sum of Revenue_attributed by Campaign_name"**
   Number: Digital Retarget shows the largest spend-vs-revenue gap (~$2.2M deficit); every campaign's spend bar exceeds its revenue bar.
   Meaning: All 6 campaigns currently show negative attributed ROI (~$11.2M combined unrecovered spend).
   Action: Review the revenue attribution model and reassess spend allocation, starting with Digital Retarget.

4. **Visual: "Count of Records by Funnel_stage"**
   Number: Lead 465 → Closed Won 412 → Prospect 404 → Opportunity 111 (funnel narrows sharply at Opportunity).
   Meaning: The steepest drop-off in the funnel happens between Prospect and Opportunity.
   Action: Investigate why prospects stall before becoming opportunities (sales handoff process, qualification criteria).

## Sales Pipeline sheet

1. **Visual: "Count of Records by Deal_stage" (Won vs. Lost)**
   Number: Won 315 / Lost 184 (63% win rate).
   Meaning: Overall win rate is healthy but leaves room to improve on the 37% lost.
   Action: Analyze Lost-deal reasons by segment/region to target coaching.

2. **Visual: "Average of Deal_value by Company_size_tier"**
   Number: Enterprise $1,589 (highest, 201 deals) vs. Large $1,257 (lowest average, despite the most deals — 216).
   Meaning: Deal value does not scale linearly with company size; Enterprise is the most valuable segment per deal.
   Action: Weight sales capacity toward Enterprise-tier prospecting.

3. **Visual: "Count of Records by Sales_region and Deal_stage"**
   Number: Central region shows the highest Won count among the three regions shown (West, East, Central).
   Meaning: Regional performance is uneven; Central is currently the strongest performer.
   Action: Study Central's playbook for replication in East/West.

## Customer Health sheet

1. **Visual: "Risk Indicators – At-Risk Accounts" table**
   Number: YieldMax Software — 334 tickets, 63 negative-sentiment tickets, $40,722 total deal value (nearly double the next account's ticket count).
   Meaning: YieldMax Software is the single highest-risk account by the combined ticket-volume + negative-sentiment + deal-value criteria from the original brief.
   Action: Prioritize proactive account-management outreach to YieldMax Software, TrueNorth Electronics, and LionGate Holdings (the top 3 at-risk accounts).

2. **Visual: "Average of Resolution_time_hours by Priority"**
   Number: Critical tickets resolve only ~8% faster than Low-priority tickets (~56 vs. ~61 hours).
   Meaning: The current prioritization gives critical issues only a modest speed advantage.
   Action: Evaluate whether critical-ticket SLAs should be tightened further.

3. **Visual: "Count of Records by Customer_sentiment" (pie chart)**
   Number: Neutral is the largest slice, followed by negative, then positive.
   Meaning: A meaningful share of tickets carry negative sentiment, which feeds directly into the at-risk account scoring.
   Action: Route negative-sentiment tickets to a dedicated escalation queue for faster follow-up.

## Note on this deliverable

Live dashboard screenshots could not be exported directly from this session into a downloadable file — the browser automation tool used to drive your QuickSight session in this conversation isn't able to hand captured images back to the file-delivery pipeline. The dashboard itself is fully built, published, and interactive in your QuickSight account (Dashboards → "NovaTech Revenue Intelligence Dashboard"), and every number and insight above was read directly off it, so capturing the actual screenshots is a 2-minute manual step (open each sheet, screenshot the visual named above, add a text callout with the annotation text given).
