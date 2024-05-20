import { Resolver } from "./types.ts";

type Context = {
    prisma: {
        user: {
            findMany: () => Promise<any>;
            create: (args: { data: { email: string } }) => Promise<any>;
        };
    };
};

type Args = {
    email: string;
};

export const resolvers: Resolver<any, any, Context, any> = {
    Query: {
        users: async (_, __, context) => {
            return context.prisma.user.findMany();
        },
    },
    Mutation: {
        createUser: async (_, args: Args, context) => {
            return context.prisma.user.create({
                data: {
                    email: args.email,
                },
            });
        },
    },
};