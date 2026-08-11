# Access Patterns

Single-user personal finance app. Every transaction carries a category (income vs. expense, e.g. "groceries").

| Pattern | Note |
| --- | --- |
| List all accounts of the user with balances | Read pattern: list, ordered by `name`. Attributes: id, name, balance |
| Read a single account | Read pattern: point lookup |
| Read transaction history for a single account paginated | Read pattern: newest first, paginated |
| Filter transactions by transaction type | Read pattern: newest first, paginated |
| Filter transactions by category | Read pattern: newest first, paginated |
| Filter transactions by date range | Read pattern: newest first, paginated |
| List all transactions across all accounts for a single user | Read pattern: newest first, paginated |
| Monthly report of totals by category | Computed after fetch: sum amount grouped by category (income vs. expense) |
| Search by description | Read pattern: full scan |
