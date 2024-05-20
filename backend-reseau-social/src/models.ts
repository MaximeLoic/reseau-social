import gql from "graphql-tag";

export const typeDefs = gql


export type  User = {
    id: number;
    name: string;
    email: string;
    password: string;
    articles?: Article[];
}

export type Article = {
    id: number;
    title: string;
    content: string;
    authorId: number;
    author?: User;
    comments?: Comment[];
    likes?: Like[];
}

type Comment = {
    id: number;
    content: string;
    authorId: number;
    articleId: number;
    author?: User;
}

type Like = {
    id: number;
    userId: number;
    articleId: number;
    user?: User;
    article?: Article;
}

