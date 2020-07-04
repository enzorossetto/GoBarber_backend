# GoBarber backend - done with NodeJS

## To run the project

1. You must have [NodeJS](https://nodejs.org/en/download/) on your machine

   - And [Yarn](https://classic.yarnpkg.com/en/docs/install) if you want to run without modifying any file

2. Open the project folder in your terminal and run the command `yarn` to install the dependencies

   - Or run `npm i` if not using yarn

3. Create a [PostgreSQL database](https://www.postgresql.org/)

   - You can use a [Postgres Docker image](https://hub.docker.com/_/postgres) and I recommend you to do it
   - Change the file [ormconfig.json](https://github.com/enzorossetto/GoBarber_backend_with_NodeJS/blob/master/ormconfig.json) to use your databese settings

4. Run the command `yarn typeorm migration:run` to execute all migrations

5. Run the command `yarn dev:server` to start the application

> You may have to change the `scripts` inside [package.json](https://github.com/enzorossetto/GoBarber_backend_with_NodeJS/blob/master/package.json) if running commands with `npm`

## Routes

> The base URL is **http://localhost:3333**

> Use something like [Insomnia](https://insomnia.rest/download/) to make the requests

`POST /users`: create a new user sending a JSON as request body with the fields `name`, `email` and `password`. Example:

    {
      "name": string,
      "email": string,
      "password": string
    }

`POST /sessions`: create a new session to an user passing `email` and `password`. This route returns user information and a JSON Web Token. Example:

    {
      "user": {
        "id": uuid-v4,
        "name": string,
        "email": string,
        "created_at": "2020-07-02T23:45:50.751Z",
        "updated_at": "2020-07-02T23:45:50.751Z"
      },
      "token": JWT
    }

> OBS: from now you must use the JWT as an authentication header. On Insomnia you can set it at Auth tab selecting `Bearer Token`

`POST /appointments`: send a JSON as request body with `provider` and `date`. Example:

    {
     "provider_id": uuid-v4,
     "date": Timestamp -> ISO-8601
    }

`GET /appointments`: you will receive a list with all appontments. Example:

    [
      {
        "id": uuid-v4,
        "provider": uuid-v4,
        "date": "2020-06-21T10:00:00.000Z",
        "created_at": "2020-06-21T10:00:00.000Z",
        "updated_at": "2020-06-21T10:00:00.000Z"
      },
      {
        "id": uuid-v4,
        "provider": uuid-v4,
        "date": "2020-06-21T12:00:00.000Z",
        "created_at": "2020-06-21T12:00:00.000Z",
        "updated_at": "2020-06-21T12:00:00.000Z"
      },
      {
        "id": uuid-v4,
        "provider": uuid-v4,
        "date": "2020-06-21T13:00:00.000Z",
        "created_at": "2020-06-21T13:00:00.000Z",
        "updated_at": "2020-06-21T13:00:00.000Z"
      }
    ]

