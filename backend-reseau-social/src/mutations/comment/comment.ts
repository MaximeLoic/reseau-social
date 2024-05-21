import { PrismaClient } from '@prisma/client';
import { MutationResolvers } from "../../types";

const prisma = new PrismaClient();

export const comment: MutationResolvers['comment'] = async (_, {articleId, content}, {userId}) => {
    if (!userId) throw new Error("Not authenticated");

    const article = await prisma.article.findUnique({where: {id: articleId}});

    if (!article) throw new Error("Article not found");

    return prisma.comment.create({
        data: {
            content,
            user: {connect: {id: userId}},
            article: {connect: {id: articleId}}
        }
    });
}

export default comment;