# React Finland Vodcast Demo by TRIGO

This demo shows how to integrate authentication into [Next.js](https://nextjs.org/) using [NextAuth.js](https://next-auth.js.org/). To keep things simple we use an email based passwordless auth flow for the demo. NextAuth.js supports sever Authentication Providers e.g. [Keycloak](https://www.keycloak.org/). If you got stuck while running the demo feel free to ask any question you might have even after the [React Finland](https://react-finland.fi/ Vodcast Demo,

You can find me on [Twitter](https://twitter.com/kelkes) and [LinkedIn](https://www.linkedin.com/in/dwippel/)

## Prerequisites

- [docker](https://docs.docker.com/get-docker/)
- docker-compose (usually included when installing docker)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) (or yarn if you prefer)

## Installation

As storage for the user information we use [PostgreSQL](https://www.postgresql.org/). To have a nice "UI" on-top (to execute SQL or query data) a [hasura.io](https://hasura.io/) setup was added to the docker-compose file.

### Spin up the required infrastructure

```bash
cd data
npm i
docker-compose -p vodcast up -d
npm run console
```

(the `-p` param is optional, I like to give the containers a project name though)

This opens a browser window at `http://localhost:9695/console/api-explorer`.

### Prepare SQL Schema for NextAuth

Goto `http://localhost:9695/console/data/sql` and Copy&Paste the Schema from `https://next-auth.js.org/adapters/typeorm/postgres` into the Editor. Hit "Run" at the Bottom.

## Start the Next.js App

```bash
npm i
npm run dev
```

Open `http://localhost:3000` and start playing with the Demo.

## Source Code structure

| Folder  | Purpose   |
|---|---|
| data   | docker-compose setup inlcuding PostgreSQL and hasura.io  |
| components  | some react components  |
| pages  | next.js app  |
| pages/api  | next.js api examples  |
| pages/api/auth  | NextAuth.Js "magic" is happening here  |

The Demo was heavily inspired by https://github.com/nextauthjs/next-auth-example. I kept most of their comments because they explain things very well.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
