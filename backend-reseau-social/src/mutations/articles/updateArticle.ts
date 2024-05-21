import { PrismaClient } from '@prisma/client';
import { MutationResolvers } from '../../types';

const prisma = new PrismaClient();

const updateArticle: MutationResolvers['updateArticle'] = async (_, { id, title, content }, { userId }) => {
    if (!userId) throw new Error("Not authenticated");

    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) throw new Error("Article not found");

    if (article.authorId !== userId) throw new Error("Not authorized");

    return await prisma.article.update({
        where: { id },
        data: {
            title,
            content
        }
    });
};

export default updateArticle;