import { PrismaClient } from '@Prisma/client';

const prisma = new PrismaClient();

export type  User =  {
  id: number;
  email: string;
  password: string;
  articles?: Article[];
}

export type Article =  {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author?: User;
  comments?: Comment[];
  likes?: Like[];
}

export type Comment=  {
  id: number;
  content: string;
  authorId: number;
  articleId: number;
  author?: User;
}

export type Like = {
  id: number;
  userId: number;
  articleId: number;
  user?: User;
  article?: Article;
}
