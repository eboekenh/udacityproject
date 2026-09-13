# NovaTech Data Verification Log

**Student Name:** Ecem Bökenheide
**Date:** September 1, 2026

## Instructions

Query each pre-indexed knowledge base using Quick Chat. For each question, record the expected answer (from the data dictionary), Q's actual response, and whether they match. Minimum 6 entries (2 per data knowledge base).

## Verification Log

| # | Knowledge Base | Question Asked | Expected Answer | Q's Actual Answer | Match? | Notes |
|---|----------------|---------------|-----------------|-------------------|--------|-------|
| 1 | NovaTech CRM Deals | How many unique accounts are in this dataset? | 85 (per data dictionary) | 85 unique accounts | ✔ Yes | - |
| 2 | NovaTech CRM Deals | How many deals are Won vs Lost? | Won = 315, Lost = 184 (499 total) | Won 315, Lost 184 (499 total, 63% win rate) | ✔ Yes | Exact match to data dictionary. |
| 3 | NovaTech Marketing Campaigns | What are the distinct campaign channels? | Direct Mail, Email, Organic Search, Paid Social, Partner Referral (5 values) | Same 5 channels returned | ✔ Yes | Exact match. |
| 4 | NovaTech Marketing Campaigns | What percentage of leads responded to campaigns (campaign_response = 1)? | 27.2% (609 of 2,240) | 27.19% (609 of 2,240) | ✔ Yes | Rounding difference only (27.19% vs 27.2%). |
| 5 | NovaTech Support Tickets | How many tickets are there for each priority level? | Low 1,500 / Medium 1,050 / High 400 / Critical 50 (3,000 total) | Low 1,500 / Medium 1,050 / High 400 / Critical 50 (3,000 total) | ✔ Yes | Exact match. |
| 6 | NovaTech Support Tickets | How many tickets have no resolved date (are unresolved)? | 59 rows (2.0%) | 59 unresolved tickets (~2%) | ✔ Yes | Exact match. |
| 7 | NovaTech Reference Documents | According to the company background document, how many employees does NovaTech Solutions have, and how many active accounts does it serve? | ~200 employees, 85 active accounts | Employees: roughly 200 people. Active Accounts: 85 active accounts (small startups <200 employees to large enterprises 5,000+ employees) | ✔ Yes | Answered by attaching novatech_company_background.pdf directly to the chat (file-upload / "Document" attachment flow), since this knowledge base is unstructured text rather than a dataset. |

## Cross-Check

Pick one fact from above and confirm it independently in the QuickSight dataset preview.

- **Fact verified:** 85 unique/active accounts (rows #1 and #7 above).
- **Chat said:** 85 unique accounts (from NovaTech CRM Deals dataset) and 85 active accounts (from the company background reference document) — two independent knowledge bases agree.
- **QuickSight shows:** Opened `novatech_crm_deals.csv` in the dataset editor and added a temporary Aggregate transform step (Count Distinct on `account_id`). The preview returned **85** as the distinct count. The change was not saved (Cancel was clicked) so the underlying dataset was left untouched.
- **Consistent?** Yes — all three independent checks (Quick Chat over the CRM dataset, Quick Chat over the Reference Documents PDF, and a direct aggregation in the QuickSight dataset editor) agree on 85 accounts, confirming both data integrity and the accuracy of Q's answers.

Screenshoots
1.
<img width="516" height="356" alt="image" src="https://github.com/user-attachments/assets/510e989e-862a-4556-95c6-f2ccccf89039" />
2.
<img width="967" height="622" alt="image" src="https://github.com/user-attachments/assets/e28a8ade-0ca6-42d8-91af-5809d23dff03" />
3.
<img width="536" height="365" alt="image" src="https://github.com/user-attachments/assets/8f2b3fed-d5c7-42f5-98dc-0a0a061e56e4" />
4.
<img width="417" height="252" alt="image" src="https://github.com/user-attachments/assets/f595de75-7f36-4a5e-9657-15bced145f70" />
5.
<img width="431" height="597" alt="image" src="https://github.com/user-attachments/assets/a3049dbb-47f4-4bd0-aeb0-b6243661417b" />
6.
<img width="432" height="221" alt="image" src="https://github.com/user-attachments/assets/704c9f1d-74ec-4cbd-aeea-0525d97d6eff" />




