import {Resolvers} from "./types";
import {createUser} from "./mutations/users/createUser.js";
import {signIn} from "./mutations/users/signIn.js";
import createArticle from "./mutations/articles/createArticle";
import deleteArticle from "./mutations/articles/deleteArticle";
import updateArticle from "./mutations/articles/updateArticle";
import {like} from "./mutations/like/like";
import dislike from "./mutations/like/dislike";
import comment from "./mutations/comment/comment";
import uncomment from "./mutations/comment/uncomment";

export const resolvers: Resolvers = {
    Query: {
        getUsers: async (_, __, {prisma}) => {
            return prisma.user.findMany();
        },
        getArticles: async (_, __, {prisma}) => {
            return prisma.article.findMany({
                include: {
                    likes: true,
                    comments: true,
                }
            })
        },
    },

    Mutation: {
        createUser: createUser,
        signIn: signIn,
        createArticle: createArticle,
        deleteArticle: deleteArticle,
        updateArticle: updateArticle,
        like: like,
        dislike: dislike,
        comment: comment,
        uncomment: uncomment,
    },
};
