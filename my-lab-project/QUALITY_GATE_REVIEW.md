# Quality Gate Review

1. **Finding 1 (Reliability/Accuracy):** SQL string concatenation posed SQL injection risks.
   - **Fix:** Refactored SQL queries to use parameter binding (`.bind()`).
   - **Evidence:** Verified all SQL statements use `?` syntax with bindings.

2. **Finding 2 (Reliability/Accuracy):** Missing validation for invalid time ranges (`startAt >= endAt`).
   - **Fix:** Added Epoch timestamp comparisons in `POST` and `PATCH` handlers returning `400 Bad Request`.
   - **Evidence:** Tested with `curl` case 5, correctly returning HTTP 400.

3. **Finding 3 (Reasoning/You Own It):** Time overlap check didn't filter out current booking ID during `PATCH` operations.
   - **Fix:** Added `AND id != ?` to the overlap check SQL query for update routes.
   - **Evidence:** Updating non-time fields on existing bookings no longer triggers self-conflict 409 errors.