import { GraphQLServer } from 'graphql-yoga';

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
    post: Post
    greeting(name: String!, position: String): String!
    add(num1: Float!, num2:Float!): Float!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      return `Hello ${args.name} you are ${
        args.position ? 'a ' + args.position : 'nothing.'
      }`;
    },
    me() {
      return {
        id: 'abc123',
        name: 'Luz',
        email: 'luz@example.com',
        age: 33,
      };
    },
    post() {
      return {
        id: '12341234',
        title: 'The title',
        body: 'Body',
        published: true,
      };
    },
    add(parent, args, ctx, info) {
      const { num1, num2 } = args;
      return num1 + num2;
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
