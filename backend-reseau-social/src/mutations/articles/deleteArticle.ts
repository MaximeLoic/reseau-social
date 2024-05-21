import { PrismaClient } from '@prisma/client';
import { MutationResolvers } from '../../types';

const prisma = new PrismaClient();

const deleteArticle: MutationResolvers['deleteArticle'] = async (_, { id }, { userId }) => {
    if (!userId) throw new Error("Not authenticated");

    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) throw new Error("Article not found");

    if (article.authorId !== userId) throw new Error("Not authorized");

    return await prisma.article.delete({
        where: { id }
    });
};

export default deleteArticle;