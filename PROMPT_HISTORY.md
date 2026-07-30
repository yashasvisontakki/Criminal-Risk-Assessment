# Prompt History — Criminal Risk Assessment Request (XLSForm → Pug)

LLM used: Claude (Sonnet, extended-thinking capable), Anthropic — chosen because the task
required reasoning across two different input formats at once (a scanned/structured PDF layout
and a tabular XLSForm schema) and holding a consistent variable-naming scheme across both outputs
without drifting into invented field names.

## Prompt 1
"Here's a PDF form (Criminal_Risk_Assessment_Request.pdf) and a reference XLSForm
(BBCI.xlsx) built for a different, unrelated form. Explain step by step how to turn the PDF into
an ODK XLSForm and then generate a Pug template from it using an AI model, so I can complete this
assignment."

→ Response: a structured field-by-field mapping of the PDF into XLSForm `type`s (text, date,
select_one, select_multiple, note, calculate, image), grouped by page/section, plus a workflow
for validating the form and prompting an LLM for the Pug step.

## Prompt 2
"Yes" (approval to have the XLSForm built directly)

→ Response: built `criminal-risk-assessment.xlsx` with `survey`/`choices`/`settings` sheets,
covering:
- `consent_section` group (consent note, consent_given, consent_date, signature_assessed,
  witness_name — with `relevant` logic tying witness/signature to consent)
- `identity` group (first/second/last name, dob, gender, other names, address, phone, birth
  place, id_type multi-select, conditional other/licence fields)
- `request_details` group (calculated full-name display, agency name, reason_for_assessment,
  conditional consent-required warning, assigned worker, dates, designate contact fields with
  an email format constraint)

Validated locally with `pyxform`'s `xls2xform` converter (the same engine behind
https://getodk.org/xlsform/) — conversion succeeded with only one informational warning
(suggesting a `max-pixels` appearance on the signature image field).

## Prompt 3
"feed the PDF + this .xlsx to your chosen reasoning-capable LLM and ask it to produce the Pug
template, keeping the variable names exactly as defined [in the XLSForm] so the bindings line up"

→ Response: built `criminal-risk-assessment.pug`, a two-page HTML/Pug render template that:
- Reproduces the PDF's visual structure (Manitoba Families header, agency block, boxed consent
  section, printed field grid, checkbox groups, signature block, page 2 legal notice, designate
  contact grid)
- Binds every dynamic field to the exact XLSForm `name` values (`data.first_name`, `data.dob`,
  `data.id_type`, `data.reason_for_assessment`, etc.) — no invented field names
- Renders `select_multiple`/`select_one` answers as checked/unchecked boxes matching the PDF's
  checkbox style, and keeps the long legal paragraphs as static text
- Adds conditional logic mirroring the XLSForm's own `relevant` rules (e.g. the "must have
  consent" warning only appears for Place of Safety / Kinship reasons)

Test-rendered with `pug.renderFile()` against sample submission data — rendered without template
errors (see `index.html` for the sample output).

## Notes on corrections made to the source PDF
- The PDF's sex/gender row is misprinted as "MALE ☐ MALE ☐" (a source typo — the second option is
  clearly meant to be Female). Both the XLSForm and the Pug template correct this to Male/Female.
