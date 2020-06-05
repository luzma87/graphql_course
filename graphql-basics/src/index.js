import { GraphQLServer } from 'graphql-yoga';

// Dummy data
const users = [
  { id: '1', name: 'luz', email: 'luz@example.com' },
  { id: '2', name: 'pepe', email: 'pepe@example.com', age: 39 },
  { id: '3', name: 'mike', email: 'mike@example.com' },
];

const posts = [
  { id: '1', title: 'title 1', body: 'body 1', published: true, author: '3' },
  { id: '2', title: 'title 2', body: 'body 2', published: false, author: '1' },
  { id: '3', title: 'title 3', body: 'body 3', published: true, author: '1' },
];

const comments = [
  { id: '1', text: 'comment 1 post 1', author: '1', post: '1' },
  { id: '2', text: 'comment 2 post 1', author: '2', post: '1' },
  { id: '3', text: 'comment 1 post 2', author: '1', post: '2' },
  { id: '4', text: 'comment 1 post 3', author: '3', post: '3' },
];
/*
  Scalar types
    String
    Boolean
    Int
    Float
    ID  uuid
*/

// Type definitions
const typeDefs = `
  type Query {
    me: User
    post(id: String!): Post
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query:String):[Comment!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: 'abc123',
        name: 'Luz',
        email: 'luz@example.com',
        age: 33,
      };
    },
    users(parent, args, ctx, info) {
      if (!args.query) return users;
      return users.filter((user) =>
        user.name.toLowerCase().includes(args.query.toLowerCase()),
      );
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === args.id);
    },
    posts(parent, args, ctx, info) {
      if (!args.query) return posts;
      return posts.filter(
        (post) =>
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase()),
      );
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === parent.post);
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('Server running in port 4000');
});
