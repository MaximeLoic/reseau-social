import { Resolvers } from "./types";
import { GraphQLError } from "graphql";
import { createUser } from "./mutations/users/createUser";
import { signIn } from "./mutations/users/signIn";
import { MutationResolvers } from "./types";

export const resolvers: Resolvers = {
    Query: {
        getUsers: async (_, __, { prisma }) => {
            return prisma.user.findMany();
        }
    },
    Mutation: {
        createArticle: async (_, { authorId, content, title }, { prisma }) => {
            return prisma.article.create({
                data: {
                    authorId,
                    content,
                    title,
                },
            });
        },
        deleteArticle: async (_, { id }, { prisma }) => {
            await prisma.article.delete({ where: { id } });
            return true;
        },
        createUser: createUser,
        signIn: signIn
    },

};