import { Resolvers } from "./types";
import { GraphQLError } from "graphql";
import { createUser } from "./mutations/users/createUser.js";
import { signIn } from "./mutations/users/signIn.js";
import { MutationResolvers } from "./types";

export const resolvers: Resolvers = {
    Query: {
        getUsers: async (_, __, { prisma }) => {
            return prisma.user.findMany();
        }
    },
    Mutation: {
        deleteArticle: async (_, { id }, { prisma }) => {
            await prisma.article.delete({ where: { id } });
            return true;
        },
        createUser: createUser,
        signIn: signIn
    },

};