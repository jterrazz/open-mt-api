# Routes

The `routes` folder contains all the logic related to handling application routes. It serves as a **central hub for defining and managing the endpoints of the application**.

Routes are responsible for **handling incoming requests** from clients and directing them to the appropriate controllers or handlers. They define the URLs, HTTP methods, and the corresponding functions that should be executed when a request is received.

By organizing the route logic in a separate folder, we can maintain a clear separation between the routing concerns and the business logic. This separation allows for better maintainability, testability, and scalability of the application.

## Route Tests

To ensure the correctness and robustness of the routes, it's essential to have tests in place. The `/tests/e2e/api` folder, contains the tests for each route.
