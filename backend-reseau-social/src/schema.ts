import gql from "graphql-tag";

export const typeDefs = gql`
scalar ID

type Query {
  getUsers: [User]!
  getUser(id: ID!): User
  getArticles: [Article]!
  getArticle(id: ID!): Article
  getComments(postid: ID!): [Comment]!
  getComment(id: ID!): Comment
}

type Mutation {
  createUser(username: String!, password: String!): User!
  signIn(email: String!, password: String!): SignInResponse!
  createArticle(title: String!, content: String!, authorId: Int!): Article!
  updateArticle(id: ID!): Article!
  deleteArticle(id: ID!): Boolean!
}

type User {
  id: ID!
  username: String!
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
  authorisation: String!
}
`