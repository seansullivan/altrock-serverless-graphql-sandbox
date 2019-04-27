const { ApolloServer } = require('apollo-server-lambda');

const schema = require('./schema');
const resolvers = require('./resolvers');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const seedData = require('./data.json');
const DB_FILE = 'db.json';

// Data Loaders
const createLoaders = require('./loaders');

const connections = {
    db: null
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ event, context }) => {
        if (!connections.db) {
            connections.db = low(new FileSync(DB_FILE));
            connections.db.defaults(seedData).write();
        }

        return {
            event,
            context,
            connections,
            loaders: createLoaders(connections)
        };
    },
    formatError: err => {
        console.error(JSON.stringify(err));
        return err;
    }
});

exports.graphql = server.createHandler({
    cors: {
        origin: '*',
        methods: 'GET,POST,OPTIONS',
        allowedHeaders: 'Content-Type',
        preflightContinue: false,
        optionsSuccessStatus: 200
    }
});
