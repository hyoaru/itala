- user
  - id
  - name
  - email
  - created_at
  - updated_at

- account
  - id
  - user_id
  - name
  - balance
  - created_at
  - updated_at

- category_type
  - id
  - name
  - created_at
  - updated_at

- category
  - id
  - user_id
  - category_type_id
  - name
  - created_at
  - updated_at

- transaction_type
  - id
  - name
  - created_at
  - updated_at

- transaction
  - id
  - transaction_type_id
  - account_id
  - amount
  - description
  - created_at
  - updated_at
