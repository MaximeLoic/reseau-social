import { hashPassword } from "../../modules/auth";
import { MutationResolvers } from "../../types";

export const createUser: MutationResolvers['createUser'] = async (_, {email, name, password}, {dataSources}) => {
    try {
        const hashedPassword = await hashPassword(password);
        const createdUser = await dataSources.db.user.create({
            computed: undefined, methods: undefined, watch: undefined,
            data: {email, name, password: hashedPassword}
        });

        return {
            code: 201,
            message: 'User has been created',
            success: true,
            user: {
                id: createdUser.id,
                email: createdUser.email,
                name: createdUser.name,
                posts: [],
                postsLike: []
            }
        }
    } catch(e) {
        return {
            code: 400,
            message: (e as Error).message,
            success: false,
            user: null
        }
    }
}