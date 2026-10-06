# Quality Gate Review

## Findings & Fixes

### 1. Reliability/Accuracy: Missing Input Date Validation
- **Finding:** The initial logic did not validate if `startAt` was earlier than `endAt`.
- **Fix:** Added validation `if (new Date(startAt) >= new Date(endAt))` returning a `400 Bad Request` with `{ "error": "startAt must be before endAt" }`.
- **Evidence:** Tested with cURL passing invalid date ranges; system correctly returned HTTP status 400.

### 2. Security: Parameter Binding Enforcement
- **Finding:** Checked codebase for string concatenation in SQL queries.
- **Fix:** Refactored all database calls to use parameter binding (`db.prepare(...).bind(...)`).
- **Evidence:** Verified all SQL parameters are bound safely without dynamic string interpolation.

### 3. Reasoning / You Own It: Overlap Exclusion on Update
- **Finding:** During `PATCH /bookings/:id`, checking overlap without excluding the current booking ID caused self-conflict (409).
- **Fix:** Updated the overlap query for PATCH to include `AND id != ?`.
- **Evidence:** Updating non-time fields (e.g. borrowerName) for an existing booking now succeeds with HTTP 200.