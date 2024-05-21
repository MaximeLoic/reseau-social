import { PrismaClient } from '@prisma/client';
import { MutationResolvers } from '../../types';

const prisma = new PrismaClient();

const createArticle: MutationResolvers['createArticle'] = async (_, { title, content }, { userId }) => {
    if (!userId) throw new Error("Not authenticated");
    return await prisma.article.create({
        data: {
            title,
            content,
            author: { connect: { id: userId } }
        }
    });
};

export default createArticle;