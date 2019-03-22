require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const cookieParser = require('cookie-parser')
const { prisma } = require('./generated')
const resolvers = require('./resolvers')
const addUserId = require('./middleware/addUserId')
const addUser = require('./middleware/addUser')

const { APOLLO_ENGINE_KEY, NODE_ENV, FRONTEND_DEV, FRONTEND_PROD, PORT } = process.env

const server = new ApolloServer({
  typeDefs: importSchema('./src/schema.graphql'),
  resolvers,
  context: ({ req, res }) => ({
    user: req.user,
    userId: req.userId,
    prisma,
    res
  }),
  engine: {
    apiKey: APOLLO_ENGINE_KEY
  },
  playground: true,
  introspection: true
})

const app = express()
app.use('*', cookieParser(), addUserId, addUser)

const cors = {
  origin: NODE_ENV === 'production' ? FRONTEND_PROD : FRONTEND_DEV,
  credentials: true
}

server.applyMiddleware({
  app,
  server,
  path: '/graphql',
  cors
})

app.listen({ port: PORT }, () => console.log('server up @ port: %d env: %s', PORT, NODE_ENV))
