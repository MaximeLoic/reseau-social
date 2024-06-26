import gql from "graphql-tag";

export const typeDefs = gql`
scalar ID

type Query {
  getUsers: [User]!
  getUser(id: ID!): User
  getArticles: [Article]!
  getArticle(id: ID!): Article
  getComments(articleId: ID!): [Comment]!
  getComment(id: ID!): Comment
}

type Mutation {
  signIn(username: String!, password: String!): SignInResponse
  createArticle(title: String!, content: String!, authorId: Int!): CreateArticleResponse
  updateArticle(id: ID!, title: String!, content: String!): UpdateArticleResponse
  deleteArticle(id: ID!): Boolean!
  createUser(username: String!, email: String!, password: String!): CreateUserResponse
    like(articleId: Int!, userId: Int!): Boolean!
    dislike(articleId: Int!, userId: Int!): Boolean!
    comment(articleId: Int!, userId: Int!, content: String!): Boolean!
    uncomment(commentId: Int!, userId: Int!): Boolean!
}

type User {
  id: ID!
  username: String!
  email: String!
  articles: [Article]!
  likes: [Like]!
  comments: [Comment]!
}

type Article {
  id: ID!       
  title: String!
  content: String! 
  authorId: Int!
  author: User!
  comments: [Comment]!
  likes: [Like]!
}

type Comment {
  id: Int!     
  content: String!
  author: User!      
  authorId: Int!  
  articleId: Int!
  article: Article!
}

type Like {
  id: Int!      
  user: User!     
  userId: Int!
  article: Article!  
  articleId: Int!
}

type SignInResponse {
    code: Int!
    success: Boolean!
    message: String!
    token: String
    }
    
 type CreateUserResponse {
   code: Int!
    success: Boolean!
    message: String!
    user: User
    }

type CreateArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
    article: Article
}

type UpdateArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
    article: Article
}
`