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
    hello: String!
    location: String!
    bio: String!

    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'This is a query';
    },
    location() {
      return 'Quito';
    },
    bio() {
      return 'about me';
    },

    id() {
      return 'abc123';
    },
    name() {
      return 'Some new name';
    },
    age() {
      return 33;
    },
    employed() {
      return true;
    },
    gpa() {
      return 3.5;
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
