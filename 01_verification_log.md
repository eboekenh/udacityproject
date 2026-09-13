# NovaTech Data Verification Log

**Student Name:** Ecem Bökenheide
**Date:** 2026-09-11

## Instructions

Query each pre-indexed knowledge base using Quick Chat. For each question, record the expected answer (from the data dictionary), Q's actual response, and whether they match. Minimum 6 entries (2 per data knowledge base).

## Verification Log

| # | Knowledge Base | Question Asked | Expected Answer | Q's Actual Answer | Match? | Notes |
|---|----------------|---------------|-----------------|-------------------|--------|-------|
| 1 | NovaTech CRM Deals | How many total deals are in the CRM dataset, and how many are Won vs Lost? | 499 total deals — 315 Won, 184 Lost (data dictionary: deal_stage Won=315, Lost=184) | "Total Deals: 499. Won: 315 (63.1%). Lost: 184 (36.9%). The win rate is roughly 63%..." | Yes | Exact match, including win rate. Screenshot: `documentation/screenshots/step03_01_verify_crm_q1.png` |
| 2 | NovaTech CRM Deals | What date range does the CRM deals data cover, and how many unique accounts are there? | Date range 2023-06-17 to 2025-01-25 (data dictionary); 85 unique accounts | Deal Created: Jun 17, 2023 → Jan 25, 2025 (deal_closed: Dec 3, 2023 → Jan 31, 2025 — bonus detail); 85 unique accounts across all 499 deals | Yes | Exact match on date range and account count. Screenshot: `documentation/screenshots/step03_02_verify_crm_q2.png` |
| 3 | NovaTech Marketing Campaigns | How many rows are in the marketing campaigns data, and what is the overall campaign response rate? | 2,240 rows; response rate 27.2% (609 of 2,240) | Total Rows: 2,240. Campaign Responses: 609 positive. Overall Response Rate: 27.19% | Yes | Exact match. Screenshot: `documentation/screenshots/step03_03_verify_mkt_q1.png` |
| 4 | NovaTech Marketing Campaigns | How many rows in the marketing campaigns data have a missing or null annual_income value? | 24 rows (1.1%) | 24 rows with missing/null annual_income out of 2,240 (1.07%) | Yes | Exact match. Screenshot: `documentation/screenshots/step03_04_verify_mkt_q2.png` |
| 5 | NovaTech Support Tickets | How many total support tickets are there, and what is the breakdown by priority level (low, medium, high, critical)? | 3,000 total — low 1,500, medium 1,050, high 400, critical 50 | Total: 3,000. Low 1,500 (50.0%), Medium 1,050 (35.0%), High 400 (13.3%), Critical 50 (1.7%) | Yes | Exact match, incl. per-priority breakdown table. Screenshot: `documentation/screenshots/step03_05_verify_sup_q1.png` |
| 6 | NovaTech Support Tickets | How many support tickets have a null or missing ticket_resolved_date (i.e., are still unresolved)? | 59 rows (2.0%) | 59 tickets with null/missing ticket_resolved_date, ~2% of 3,000 total | Yes | Exact match. Screenshot: `documentation/screenshots/step03_06_verify_sup_q2.png` |
| 7 | NovaTech Reference Documents | *(optional 7th — see note below)* | | | | |

**Result: 6/6 minimum entries complete, all Matches (6 for 6).** Q answered every checkable fact from the data dictionary correctly across all three knowledge bases, including one bonus detail on Q1 (deal_closed_date range) that wasn't asked for but was accurate.

*(Row 7 — an optional reference-document question — can still be added; not required since the 6/6 minimum is met with a clean pass rate.)*

## Cross-Check

Pick one fact from above and confirm it independently in the QuickSight dataset preview.

- **Confirmed.** After uploading and publishing my own `novatech_crm_deals.csv` (Data → New dataset → Upload a file → Edit settings and prepare data), the dataset detail page reports **"499 rows imported (100% success)"** — an exact, independent match for the 499-total-deals fact from entry #1 above, confirmed directly in the dataset editor's own row-count statistic rather than through Quick Chat. Screenshot: `../02_data_transformation_screenshots/01_crm_deals/fig18_dataset_detail_499rows_crosscheck.png` (see also `fig17_dataset_list_crm_spice.png`, showing the published dataset in SPICE).
