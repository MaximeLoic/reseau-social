import {PrismaClient} from '@prisma/client';
import {MutationResolvers} from "../../types";

const prisma = new PrismaClient();

export const dislike: MutationResolvers['dislike'] = async (_: undefined, {articleId}, {userId}) => {
    if (!userId) throw new Error("Not authenticated");

    const article = await prisma.article.findUnique({where: {id: articleId}});

    if (!article) throw new Error("Article not found");

    const like = await prisma.like.findFirst({where: {userId, articleId}});

    if (!like) throw new Error("Not liked yet");

    return prisma.like.delete({
        where: {
            id: like.id
        }
    });
}
export default dislike;