import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers.js';
import { getUser } from './modules/auth.js';
import { typeDefs } from './schema.js';
import db from './datasources/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        try {
            const user = getUser(token);
            return { user, db, bcrypt, jwt };
        } catch {
            return {};
        }
    },
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});