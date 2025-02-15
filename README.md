# otel-example

OpenTelemetry CRUD example

## Running Locally

First, install the dependencies

```
npm install
```

A Postgres DB is needed, so if you are using Docker, then you can start a postgres db easily.

```
docker run --name os-postgres-db -e POSTGRESQL_USER=luke -e POSTGRESQL_PASSWORD=secret -e POSTGRESQL_DATABASE=my_data -d -p 5432:5432 centos/postgresql-10-centos7
```

In this example, the db user is `luke`, the password is `secret` and the database is `my_data`

You can then start the application like this:

Set the environment variables for username and password

```
DB_USERNAME=luke
```

```
DB_PASSWORD=secret
```

Start the app

```
npm start
```

Then go to http://localhost:8080
