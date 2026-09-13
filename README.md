# NovaTech Revenue Intelligence Dashboard

Capstone project for the Udacity BI Analyst Nanodegree, a 3-sheet AWS QuickSight ("Amazon Quick") dashboard built for NovaTech Solutions, unifying CRM, Marketing, and Support data behind a single `account_id` join key, plus a natural-language Amazon Q Topic for ad-hoc business questions.

## Contents

- `reports/Verification_Log.md` — 7/7 verification questions run through Quick Chat against each knowledge base (CRM Deals, Marketing Campaigns, Support Tickets, Reference Documents), all matched against the source data dictionary, plus a Cross-Check step confirmed directly in the QuickSight dataset editor.
- `reports/Q_Exploration_Log.md` — the 5 preset business questions from the project brief, run through the "NovaTech Revenue Intelligence" Topic and cross-checked against the published dashboard's own visuals.
- `reports/NovaTech_Executive_Report.docx` — a 2-page executive summary for Sarah Chen (VP of Revenue): data strategy, design rationale, Amazon Q impact, key findings with recommended actions, and Q vs. dashboard guidance.
- `reports/Screenshot_Annotation_Guide.md` — for each of the 3 dashboard sheets, which visuals to screenshot, the specific numbers to call out, the business meaning, and the recommended action.
- `reports/NovaTech_Ilerleme_Raporu.docx` — a running Turkish-language progress log covering the full build process (dataset setup, joins, dashboard construction, Topic/Q configuration, verification work) step by step.
- `scripts/build.js` / `scripts/executive_report.js` — Node.js (`docx` library) scripts used to generate the two `.docx` deliverables above.

## Dashboard structure

Built in AWS QuickSight, 3 sheets matching the project brief:

1. **Marketing Funnel** — campaign performance by channel, lead-to-deal conversion funnel, campaign spend vs. revenue, response rates.
2. **Sales Pipeline** — deal stages/outcomes, revenue by product and company size, win rates, days to close.
3. **Customer Health** — ticket volume by account, resolution time by priority, product-area issues, sentiment, and a combined at-risk accounts table (high ticket volume + negative sentiment + high deal value).

All three sheets share cross-page filters and drill-down via `account_id`. A published Amazon Q Topic ("NovaTech Revenue Intelligence") lets the Revenue team ask natural-language questions directly against the same unified data model.

## Data sources

- `novatech_crm_deals.csv` — 499 rows, 20 columns
- `novatech_marketing_campaigns.csv` — 2,240 rows, 20 columns
- `novatech_support_tickets.csv` — 3,000 rows, 20 columns

All three share `account_id` as the common join key (85 unique accounts).

