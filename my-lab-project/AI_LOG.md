# AI Log - Midterm Practical Lab Test

## Prompts Used
1. "How to validate startAt < endAt and check overlapping booking times in SQLite/D1?"
2. "How to setup Hono endpoints with parameter binding to prevent SQL Injection?"

## AI Output Utilized
- Used the SQL overlap query logic: `(startAt < ? AND endAt > ?)`
- Applied parameterized query patterns using `.bind()` in D1

## Student Verification & Modifications
- Verified that all SQL queries strictly use parameter binding (`.bind()`) to pass security checks.
- Handled edge cases such as returning 409 Conflict when overlapping occurs, and 400 Bad Request when validation fails.