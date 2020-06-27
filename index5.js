const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Mutation {
        setMessage(message: String): String
    }

    type Query {
        getMessage: String
    }
`;

const fakeDatabase = {};

const resolvers = {
    Mutation: {
        setMessage: (_, {message}) => {
            fakeDatabase.message = message;
            return message;
        }
    },
    Query: {
        getMessage: () => {
            return fakeDatabase.message;
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers})

server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
