import { GraphQLError } from "graphql";
import { Resolvers } from "./types.js";
import { createUser } from "./mutations/createUser.js";
import { signIn } from "./mutations/signIn.js";
import { createArticle } from "./mutations/createArticle.js";
import { createComment } from "./mutations/createComment.js";
import { createLike } from "./mutations/createLike.js";

const articleResolvers: Resolvers<Context> = {
    Query: {
      
      article: async (_, { id }, { prisma }) => {
        return prisma.article.findUnique({ where: { id } });
      },
      articles: async (_, __, { prisma }) => {
        return prisma.article.findMany();
      },

      comment: async (_, { id }, { prisma }) => {
        return prisma.comment.findUnique({ where: { id } });
      },

      like: async (_, { id }, { prisma }) => {
        return prisma.like.findUnique({ where: { id } });
      },
      
    },
    Mutation: {
      
      createArticle: async (_, { title, content, authorId }, { prisma }) => {
        const newArticle = await prisma.article.create({
          data: {
            title,
            content,
            author: { connect: { id: authorId } }, 
          },
        });
        return newArticle;
      },
      
      updateArticle: async (_, { id, title, content }, { prisma }) => {
        const updatedArticle = await prisma.article.update({
          where: { id },
          data: { title, content },
        });
        return updatedArticle;
      },

      
      deleteArticle: async (_, { id }, { prisma }) => {
        const deletedArticle = await prisma.article.delete({ where: { id } });
        return deletedArticle;
      },

      createComment: async (_, { content, userId, articleId }, { prisma }) => {
       
        const newComment = await prisma.comment.create({
          data: {
            content,
            author: { connect: { id: userId } }, 
            article: { connect: { id: articleId } }, 
          },
        });
        return newComment;
    },

    createLike: async (_, { userId, articleId }, { prisma }) => {
      
      const newLike = await prisma.like.create({
        data: {
          user: { connect: { id: userId } },
          article: { connect: { id: articleId } }, 
        },
      });
      return newLike;
    },
  }
}
  
  export default articleResolvers ;


