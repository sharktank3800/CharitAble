const express = require('express')

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require('./schema')
const cookieParser = require('cookie-parser')
const { authenticate } = require('./auth')
const app = express();
const db = require('./config/connection')
require('dotenv').config()

const server = new ApolloServer({
    typeDefs,
    resolvers
})
const PORT = process.env.PORT || 3333;

async function serverStart() {
    await server.start()

    app.use(express.json())
    app.use(cookieParser())

    app.use('/graphql', expressMiddleware(server, {
        context: authenticate
    }))



    db.on('open', () => {

        console.log("DB connection established");

        app.listen(PORT, () => {
            console.log(`started, listening on ${PORT}`)
            console.log("GraphQl ready")
        })
    })
}

serverStart()
