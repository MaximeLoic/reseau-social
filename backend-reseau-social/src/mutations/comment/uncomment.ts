import { PrismaClient } from '@prisma/client';
import { MutationResolvers } from "../../types";

const prisma = new PrismaClient();

export const uncomment: MutationResolvers['uncomment'] = async (_, {commentId}, {userId}) => {
    if (!userId) throw new Error("Not authenticated");

    const comment = await prisma.comment.findUnique({where: {id: commentId}});

    if (!comment) throw new Error("Comment not found");

    if (comment.userId !== userId) throw new Error("Not authorized");

    return prisma.comment.delete({
        where: {
            id: commentId
        }
    });
}

export default uncomment;