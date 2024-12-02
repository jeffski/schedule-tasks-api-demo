# Shedules and Tasks Demo Project

A simple demo application using Docker, Nest.js, Prisma and Postgres database. The application if containerised using
Docker and Docker Compose.

The demo creates two REST API CRUD endpoints to manage schedules and related tasks.

## Requirements

- Docker (tested and built using Docker 24.0.7 on Ubuntu 22.04)
- Make
- cURL

Make is used to run Docker commands. If you don't want to install or run make, you can copy the commands in the `Makefile` and run them directly. cURL can be used to interact with the API. See Usage examples below.

## Setup

Run the following steps to set up the database configuration:

### Configure .env variables

Copy the `.env.dist` file to `.env`

```bash
cp .env.dist .env
```

Edit the new `.env` file and enter details as required. For local development and testing you can leave the values as is.

## Installation

Run the following commands to install and run the project for the first time.

### Build and run the project for the first time

```bash
make build
```

This will setup and start the Nodejs and Postgres containers.

### Run database migrations

```bash
make migrate
```

This will create the schedules and tasks database tables in Postgres.

### Copy node_modules to host

```bash
make modules
```

This copies the node_modules file from the container to the host. This ensures the development IDE can find the required
npm modules.


## Starting and stopping the project

Once the project is installed and set up you can start and stop the project using the commands below.

### Start the project once built

```bash
make start
```

### Stop the project

```bash
make stop
```

## Development

### Install new modules

```bash
make add module=<module-name>
```

This installs a new NPM module directly in the Docker container. Replace `<module-name>` with the name of the NPM node
module.

### Run tests

Unit tests:

```bash
make test
```

End to end tests:

```bash
make e2e
```

Coverage report:

```bash
make coverage
```

## Logs

Tail the nodejs (Nest application) container logs using the following command:

```bash
make logs
```

## Usage examples

The API is available locally at http://localhost:3000, with resource endpoints at `/schedules` and `/tasks`.

You can use the following cURL commands to interact with the API.

### Schedules endpoint

#### Create schedule

```bash
curl --location 'http://localhost:3000/schedules/' \
--header 'Content-Type: application/json' \
--data '{
    "account_id": 12345,
    "agent_id": 98765,
    "start_time": "2024-11-29T00:17:38.876Z",
    "end_time": "2024-11-30T00:17:38.876Z"
}'
```

Note that dates must be provided in the ISO 8601 format as shown above.

#### List all schedules

```bash
curl --location 'http://localhost:3000/schedules/'
```

Note that related tasks are not included in the list

#### Get individual schedule

```bash
curl --location 'http://localhost:3000/schedules/:id'
```

Replace `:id` with a UUID returned by one of the records in the list all schedules endpoint response. The schedule will
include related tasks if they exist.

#### Update schedule

```bash
curl --location --request PATCH 'http://localhost:3000/schedules/:id' \
--header 'Content-Type: application/json' \
--data '{
    "account_id": 12345,
    "agent_id": 67890,
    "start_time": "2024-10-29T00:17:38.876Z",
    "end_time": "2024-11-30T00:17:38.876Z"
}'
```

This is a `PATCH` request to you only need to pass one or more parameters to be updated. Replace `:id` with a UUID of a
schedule.

#### Delete schedule

```bash
curl --location --request DELETE 'http://localhost:3000/schedules/:id'
```

Replace `:id` with a UUID of a schedule.

### Tasks

#### Create task

```bash
curl --location 'http://localhost:3000/tasks/' \
--header 'Content-Type: application/json' \
--data '{
    "account_id": 12345,
    "start_time": "2024-11-30T00:17:38.876Z",
    "duration": 2,
    "type": "WORK",
    "schedule_id": ":id"
}'
```

Replace `:id` with a UUID returned by one of the records in the list all schedules endpoint response. This will
associate the task with that schedule.

Note that the type value must be in uppercase (WORK or BREAK).

#### List all tasks

```bash
curl --location 'http://localhost:3000/tasks/'
```

#### Get individual task

```bash
curl --location 'http://localhost:3000/tasks/:id'
```

Replace `:id` with a UUID returned by one of the records in the list all tasks endpoint response. 

#### Update task

```bash
curl --location --request PATCH 'http://localhost:3000/tasks/:task_id' \
--header 'Content-Type: application/json' \
--data '{
    "account_id": 12345,
    "start_time": "2024-11-30T00:17:38.876Z",
    "duration": 4,
    "type": "WORK",
    "schedule_id": ":schedule_id"
}'
```

This is a `PATCH` request to you only need to pass one or more parameters to be updated. Replace `:task_id` with a UUID of a
task. If you update `:schedule_id`, the id must exist in the schedules resource.

#### Delete task

```bash
curl --location --request DELETE 'http://localhost:3000/tasks/:id'
```

Replace `:id` with a UUID of a task.

## Todo

Recommended updates and nice to haves/considerations.

- [ ] Validation and HTTP responses (using Pipes and DTOs?)
- [ ] Transform values like task types to lowercase and more forgiving date formatting
- [ ] Pagination on lists
- [ ] Orphaned tasks, if you delete a schedule, tasks will be orphaned
- [ ] End to end tests, seed DB or create and test on real values
- [ ] Authentication/authorisation, in a real world application anyone can CRUD
- [ ] Environment handling, production vs dev/stage
- [ ] Deployment handling, CICD pipeline/action
- [ ] Consider repository pattern
- [ ] Postman collection
