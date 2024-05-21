import { PrismaClient } from '@prisma/client';
import { MutationResolvers } from "../../types";

const prisma = new PrismaClient();

export const like: MutationResolvers['like'] = async (_, {articleId}, {userId}) => {
    if (!userId) throw new Error("Not authenticated");

    const article = await prisma.article.findUnique({where: {id: articleId}});

    if (!article) throw new Error("Article not found");

    const like = await prisma.like.findFirst({where: {userId, articleId}});

    if (like) throw new Error("Already liked");

    return prisma.like.create({
        data: {
            user: {connect: {id: userId}},
            article: {connect: {id: articleId}}
        }
    });
}

