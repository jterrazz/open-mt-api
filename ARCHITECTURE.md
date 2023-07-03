# Architecture Overview

The architecture of this project is designed to ensure a clear **separation of concerns** and follows the principles of **clean architecture**. It enables better maintainability and scalability by abstracting the business logic from the technical implementation. Let's explore the different components and directories of the project in detail for a comprehensive understanding:

### Project Structure

The project is structured into the following main directories:

```bash
<root>
└ scripts # Contains scripts for docker and database management
└ prisma # Houses the database schemas
└ src # Holds the core application code
└ tests # Contains integration tests
```

### Components: App and Worker

The project comprises two main components: the "App" and the "Worker."

#### Server

The "Server" component represents the server part of the application. It handles incoming requests and facilitates interaction with the frontend. Essentially, it is responsible for handling user interactions and responding to them accordingly.

#### Worker

The "Worker" component focuses on background tasks and asynchronous processing. It performs tasks that do not require immediate user interaction and can be processed independently. For example, it can handle long-running processes, background jobs, or tasks that need to be executed at specific intervals.

### Clean Architecture

The project strictly adheres to the principles of clean architecture, which emphasizes a strong separation of concerns. It consists of the following key layers:

```bash
src
└ adapters
  # Connects the domain and infrastructure with the application
└ application
  # Contains the abstracted use cases of the application
└ configuration
  # Injects dependencies (e.g., server implementations) into the abstracted application
└ domain
  # Contains the core business logic and domain objects
└ infrastructure
  # Houses the technical implementations (e.g., server components, database implementations)
```

#### 1. Domain

The "Domain" layer represents the core of the application, where the essential business logic resides. It encapsulates the domain objects, business rules, and use cases. This layer focuses solely on the business-specific rules and is entirely independent of external factors like frameworks or technologies.

#### 2. Infrastructure

The "Infrastructure" layer contains the technical implementations of the application contracts. Here, you will find the implementations of server components, database interactions, and other external dependencies. This layer acts as a bridge between the core business logic and the technical details, ensuring that the domain remains isolated from specific implementations.

#### 3. Application

The "Application" layer is where the abstracted use cases of the application reside. It communicates with the "Domain" layer to access the core business logic. This layer relies on interfaces (or ports) to interact with the lower-level components, such as the database or external services. The actual implementations of these interfaces are injected at runtime, allowing flexibility and testability.

#### 4. Adapters

The "Adapters" layer connects the domain and infrastructure to the application. It serves as an intermediary between the core application and external components, ensuring seamless integration. The adapters include various types, such as:

- Presenters: For frontend applications (e.g., App)
- Controllers: Links an HTTP library to its handlers (e.g., App)
- Middlewares: Intermediate steps of an HTTP library (e.g., App)
- Consumers: Used in the Worker for asynchronous processing

Adapters handle tasks like data validation, formatting outputs, and orchestrating calls to use cases, but they do not contain complex business logic.

### Configuration and Utils

- **Configuration**: The "Configuration" directory holds external configurations that need to be injected into the application. For example, server settings like the port number are managed here.

- **Utils**: The "Utils" directory contains utility files or helper functions that can be used across different parts of the application. These files encapsulate commonly used functionalities, promoting code reusability and maintainability.

### Ports

The "Ports" directory includes interfaces exposed by the application. These interfaces define the contract between different layers of the architecture. For instance, interfaces representing database access methods or API calls would be included in this directory. By relying on interfaces, the application remains adaptable to changes without altering the core business logic.

By following clean architecture principles and ensuring a clear separation of concerns, the project achieves a robust, maintainable, and flexible codebase. The architecture promotes abstracting business logic from technical details, making it easier to adapt to changes and ensuring the application's long-term success and sustainability.