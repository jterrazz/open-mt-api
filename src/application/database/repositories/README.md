# Repositories

Repositories are responsible for **handling the data access logic**. They are the only instances that can access the database.

Repositories are used to **separate** the business logic from the data access logic. This way, we can easily test our business logic without touching the database.

## Repository Test

To test a repository, please refer to the `/tests/e2e/repositories` folder.