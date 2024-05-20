import {ApolloServer, gql} from 'apollo-server';
import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';
import {resolvers} from './resolvers';
import { getUser } from "./modules/auth.js";
import { typeDefs } from "./schema.js";

const prisma = new PrismaClient();
const SECRET = 'test';

const server = new ApolloServer({
    typeDefs,
    resolvers,

    context: async ({req}) => {

        const token = (req.headers.authorization)?.split('Bearer ')?.[1]
        const user = token ? getUser(token) : null
        try {
            return {user};
        } catch {
            return {};
        }
    },
});

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
});
