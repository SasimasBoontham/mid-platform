# AI Log

## Prompt 1: Boilerplate and Setup
- **Prompt**: Generate Hono/D1 SQLite routes matching the lab contract.
- **Used**: Adapted endpoint definitions and parameter bindings.
- **Verified**: Verified SQL syntax matches D1 prepared statement constraints (`.prepare().bind().run()`).

## Prompt 2: Overlap Algorithm
- **Prompt**: Provide SQL query condition to check overlapping ISO timestamp intervals.
- **Used**: Used `startAt < newEndAt AND endAt > newStartAt`.
- **Verified**: Validated mathematical logic against edge cases (adjacent time slots like 09:00-10:00 and 10:00-11:00 do NOT count as overlap).

## Prompt 3: Quality Gate Review Formatting
- **Prompt**: Format review findings matching the rubric requirements.
- **Used**: Structure and taxonomy of findings.
- **Verified**: Re-tested code against all 5 curl cases to ensure verified evidence is accurate.

# AI Log

- **Prompt:** "How to set up D1 local schema and build Hono CRUD with overlap validation and parameter binding?"
- **AI Recommendation:** Provided Hono routing code with SQL `.bind()` and Epoch timestamp overlap logic.
- **Verification:** Verified time overlap logic (`startAt < endAt AND endAt > startAt`) manually with `curl` requests covering 200, 400, 404, and 409 response codes.