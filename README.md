# Anne's Handmade Backend

Server for Anne's Handmade Jewelry ecommerce website.

## NPM Scripts

| Command  |                                        Script                                         |                                        Description                                        |
| :------: | :-----------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
| `start`  |                     `nodemon -e js,graphql -x node src/index.js`                      |                                Starts server in production                                |
|  `dev`   | `cross-env NODE_ENV=development nodemon -e js,graphql -x node --inspect src/index.js` | Starts server in development. Sets node environment to `development`. Runs Node debugger. |
| `deploy` |                                `prisma deploy -e .env`                                |        Deploys database configuration to Prisma. Update datamodal, endpoints, etc.        |
| `reset`  |                                    `prisma reset`                                     |                                Drops all data in database.                                |
|  `seed`  |                                 `node database/seed`                                  |                               Runs database seeding script.                               |
|  `data`  |                            `npm run reset && npm run seed`                            |                      Runs `reset` then `seed` in consecutive order.                       |
