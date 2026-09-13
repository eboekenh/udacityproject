const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
} = require("docx");
const fs = require("fs");

const ACCENT = "6B2FB3";
const DARK = "222222";
const GREY = "666666";

function h1(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 140 },
  });
}
function h2(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
  });
}
function p(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: 21, color: DARK, ...opts })],
    spacing: { after: 120 },
    alignment: AlignmentType.JUSTIFIED,
  });
}
function pBold(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 21, color: DARK })],
    spacing: { after: 80 },
  });
}
function bullet(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: 21, color: DARK, ...opts })],
    bullet: { level: 0 },
    spacing: { after: 80 },
  });
}
function bulletLead(lead, rest) {
  return new Paragraph({
    children: [
      new TextRun({ text: lead, bold: true, size: 21, color: DARK }),
      new TextRun({ text: rest, size: 21, color: DARK }),
    ],
    bullet: { level: 0 },
    spacing: { after: 80 },
  });
}

function makeCell(text, opts = {}) {
  const { width, bold = false, shading = null, color = DARK, alignment = AlignmentType.LEFT } = opts;
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: shading ? { type: ShadingType.CLEAR, fill: shading } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [
      new Paragraph({
        alignment,
        children: [new TextRun({ text, bold, size: 19, color })],
      }),
    ],
  });
}

function table(headers, rows, widths) {
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((hTxt, i) => makeCell(hTxt, { width: widths[i], bold: true, shading: ACCENT, color: "FFFFFF" })),
      }),
      ...rows.map(
        (r, idx) =>
          new TableRow({
            children: r.map((cellTxt, i) => makeCell(cellTxt, { width: widths[i], shading: idx % 2 === 1 ? "F5F0FA" : null })),
          })
      ),
    ],
  });
}

const doc = new Document({
  sections: [
    {
      properties: {
        page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } },
      },
      children: [
        new Paragraph({
          children: [new TextRun({ text: "NovaTech Revenue Intelligence Dashboard", bold: true, size: 40, color: ACCENT })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Executive Summary — Prepared for Sarah Chen, VP of Revenue", size: 24, color: GREY, italics: true })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "September 1, 2026  |  Prepared by: Wysk, BI Analyst", size: 20, color: GREY })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 8 } },
        }),

        h1("1. Overview"),
        p(
          "This report summarizes the design, data strategy, and key findings of the NovaTech Revenue Intelligence Dashboard, built in AWS QuickSight to unify the Marketing, Sales, and Customer Support systems that previously operated in silos. The dashboard directly addresses the three views and five example business questions from your original brief, and adds a natural-language \"Ask a question\" layer (Amazon Q) so the Revenue team can query the data without waiting on a BI request."
        ),

        h1("2. Data Strategy"),
        bulletLead("Three source datasets, one join key. ", "CRM Deals (499 rows), Marketing Campaigns (2,240 rows), and Support Tickets (3,000 rows) were imported into QuickSight and unified entirely through the shared account_id field, exactly as specified in the brief's cross-view requirements."),
        bulletLead("Aggregate-then-join to avoid fan-out. ", "Because CRM and Support Tickets both have multiple rows per account, joining them directly at the row level would multiply totals incorrectly. Each source was first summarized to one row per account_id, then joined 1:1 — this pattern underlies the Customer Health risk table."),
        bulletLead("Verified against the data dictionary. ", "Every field's meaning and expected values were confirmed against the provided data dictionary before any visual was built. Seven independent verification queries (two each against CRM, Marketing, and Support, plus one against the written company background) all matched the expected values exactly — see the attached Verification Log."),

        h1("3. Design Rationale"),
        p(
          "The dashboard has three sheets, mirroring the three domains in your brief, with page-level filter controls and account-level drill-down so an analyst can move from a channel-level trend down to a single account's history without leaving the tool."
        ),
        table(
          ["Sheet", "Key Visuals", "Answers"],
          [
            ["Marketing Funnel", "Revenue by channel; funnel-stage counts; spend vs. revenue by campaign; response rate by channel", "Campaign performance, lead-to-deal conversion, campaign ROI, response rates"],
            ["Sales Pipeline", "Won/Lost counts; revenue by product; region x stage; deal value by company size; days to close", "Deal outcomes, revenue by segment/product, win rates, days to close, avg. deal value"],
            ["Customer Health", "Tickets by account; resolution time by priority; product-area volume; sentiment split; at-risk accounts table", "Ticket volume, resolution times, product issues, sentiment, combined risk indicators"],
          ],
          [2400, 4200, 3000]
        ),
        new Paragraph({ text: "", spacing: { after: 160 } }),

        h1("4. Amazon Q Impact"),
        p(
          "A Topic (\"NovaTech Revenue Intelligence\") was configured over all three datasets with explicit relationships on account_id, then published so the Revenue team can ask natural-language questions directly. Five of the brief's example-style questions were run against the Topic and cross-checked against the dashboard's own visuals (Q Exploration Log, attached):"
        ),
        bulletLead("4 of 5 questions matched dashboard figures exactly", ", including exact-dollar and exact-count agreement (e.g., YieldMax Software's 334 tickets / $40,722 in deal value on both Q and the At-Risk Accounts table)."),
        bulletLead("1 of 5 showed a partial mismatch: ", "a resolution-time question returned directionally correct results but inflated ticket counts, most likely from a join fan-out when Q traversed the cross-dataset relationships. This is flagged in the Q Exploration Log as a caution for count-based questions specifically — ranking and rate questions were unaffected."),

        h1("5. Key Findings & Recommended Actions"),
        bulletLead("Partner Referral drives volume, Direct Mail drives efficiency. ", "Partner Referral produces the most conversions (251) and revenue (~$680K), but Direct Mail converts leads at nearly double the rate (48.99% vs. 31.10%) on a much smaller base (149 leads). Recommendation: pilot a modest increase in Direct Mail volume to test whether its efficiency holds at scale."),
        bulletLead("Every campaign has negative attributed ROI. ", "All six campaigns show spend exceeding attributed revenue, for a combined unrecovered spend of roughly $11.2M; Digital Retarget has the largest gap (~$2.2M) despite being a retargeting campaign. Recommendation: review the revenue attribution model and reassess spend allocation, starting with Digital Retarget."),
        bulletLead("Enterprise deals are most valuable per deal, Large accounts most numerous. ", "Enterprise deals average $1,589 (201 deals) versus Large accounts' $1,257 average despite having the most deals (216). Recommendation: weight sales capacity toward Enterprise-tier prospecting where per-deal economics are strongest."),
        bulletLead("A small set of accounts carries outsized support and churn risk. ", "YieldMax Software leads all accounts with 334 tickets (63 negative-sentiment) against $40,722 in deal value, followed by TrueNorth Electronics and LionGate Holdings. Recommendation: prioritize proactive account-management outreach to these top at-risk accounts."),
        bulletLead("Support load is heavily low-priority, and critical SLA gains are modest. ", "Low-priority tickets are 1,500 of 3,000 total (50%), with 59 tickets (2%) unresolved; critical tickets resolve only about 8% faster than low-priority ones. Recommendation: evaluate whether critical-ticket SLAs should be tightened further, given the currently narrow gap."),

        h1("6. Amazon Q vs. the Dashboard — When to Use Which"),
        p(
          "Q is fastest for one-off, natural-language questions — especially rankings and comparisons — and it uniquely reaches unstructured sources like the company background PDF, which no dashboard visual can query. The dashboard remains the more reliable source for exact counts across joined tables, since every aggregation's grain is visible and fan-out effects (like the one observed in Section 4) are easier to catch. Recommendation for the team: use Q to explore and form a hypothesis quickly, and use the dashboard to confirm the exact numbers that go into decisions or reports."
        ),

        h1("7. Supporting Materials"),
        bullet("Verification Log — 7/7 entries matched the data dictionary exactly, confirming data integrity across all three source systems plus the reference documentation."),
        bullet("Q Exploration Log — 5 preset business questions run through the Topic and cross-checked against dashboard visuals, with 4 exact matches and 1 partial match (documented and explained)."),
        bullet("Published dashboard — 3 sheets (Marketing Funnel, Sales Pipeline, Customer Health), with cross-page filters and account-level drill-down live in the UdacityQuicksightLab QuickSight account."),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("/tmp/novatech_report/NovaTech_Executive_Report.docx", buf);
  console.log("done");
});
