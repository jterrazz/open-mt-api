### Architecture


- Domain / Infrastructure: Separating "métier" logic from abstract to technical implementation
- Configuration: external forlder that separates injected configuration (only params that makes sense to send through the lauching application like a server port)
- Application: contains the files used to start an application with some parameters. The best example to understand this is with a logger, or the server library used to handle requests 
- Ports: The interfaces exposed by the "application":
- Adapters: connects the domain / infra use controllers to the application.
- Utils: contains some files


- // TODO Redo this file



...

Thighly linking getTypeSafeInputsFromRequest to deserializer to force its use everytime
Even if it is upside down, i believe it will force the use of this safety net



// TODO Stop execution if TS fails and eslint !!!
// TODO Write in docs that TS and ESlint checks for architecture is respected


It follows this structure:

```bash
<root>
└ compose # docker compose configuration
└ values # configuration values
└ database # database schema
└ src # the application
└ tests # integrations tests
```

### App VS worker
...

### Clean architecture

The project follows **clean architecture** concepts.
Because of that, we benefit from a better separation of concerns:
the application is developed on solid abstracted interfaces and methods, and the technical implementation of this code is pushed to the side of the project.

#### The clean architecture structure

```bash
src
└ adapters
  # links the application to the external world
└ application
  # the abstracted use cases of the application
└ configuration
  # injects dependencies (server implementations) to the abstracted application
└ domain
  # core objects of the application
└ infrastructure
  # server implementations
```

##### 1. Adapters

It links the abstracted application to the external world. They can be of multiple types:
- presenter (for frontend applications) - App
- controllers (links an HTTP library to its handlers for example) - App
- middlewares (intermediate steps of an HTTP library) - App
- consumers - Worker

Its role is only to receive and validate the received data, format the output, and orchestrate the calls to use cases. That's all.

For example here, we connect the `koa` controllers and middlewares to our abstracted application.

##### 2. Api

The base of the applications is at the `contracts` level.
These contracts represent abstract methods of the higher levels of the application (database, external services, etc). Meaning that the implementations are never found here, but are injected at the application runtime.
The `use-cases` section will describe the behaviour of what our application can concretely do.

For example, we can:
- Register a user
- Get the details of a user
- Add a product to a shop

So it can communicate to the higher levels (DB, repositories, web) only by using interfaces.
The implementations are injected at the runtime. It can only create this logic based on the injected interfaces, and it can require the lower level: the domain.

##### 3. Domain
This layer is independent, you will never see any “require (‘…’)” to another part of the application
This layer is not be affected by external changes like routing or controllers.

##### 4. Infrastructure
This is the technical implementation of our application contracts.

> "This layer is where all the details go. The web is a detail. The database is a detail. We keep these things on the outside where they can do little harm"

##### ℹ️ The injection flow

```sh
infrastructure <=> configuration/injector.ts
                                  <=> adapters
                                      <=> application
                                          <=> domain
```