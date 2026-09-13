# Dashboard PDF export — status

**Re-exported and verified 2026-09-12.** These three PDFs (`Marketing_Funnel_2026-09-12T20_48_16.pdf`, `Sales_Pipeline_2026-09-12T20_50_08.pdf`, `Customer_Health_2026-09-12T20_51_16.pdf`) now reflect the corrected dashboard:

- **Marketing Funnel** — annotation confirmed correct: "After Topic configuration, verified campaign ROI averages +3,254.9% across all campaigns... The pre-Topic baseline of -94% was a data artifact from summing a fanned-out, lead-duplicated spend field." Second annotation on Partner Referral revenue concentration is also present and complete.
- **Sales Pipeline** — annotation confirmed correct: 63.13% win rate and days-to-close dropping from ~180 to ~10-30 days, with business impact and recommended action.
- **Customer Health** — annotation present (YieldMax Software risk finding, 334 tickets / 63 negative / $40,722 deal value), **but the "Recommended action" text is cut off mid-sentence** in the export ("Recommended action: Assign a dedicated customer" — then nothing). This is a text-box sizing issue in QuickSight, not a PDF export bug. Before final submission, consider widening/heightening that text box on the Customer Health sheet in the analysis so the full recommendation is visible, then re-export just that one sheet.

`filter_action_sales_pipeline.png` clearly shows one-click filtering (clicking "Won" highlights it and shows a tooltip with Count 315) — good evidence for that rubric item.
