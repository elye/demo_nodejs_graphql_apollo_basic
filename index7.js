const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        ip: String
    }
`;

const resolvers = {
    Query: {
        ip: (parent, args, context) => {
            return `${context.req.ip} ${context.req.headers.host}`;
        }
    }
};

const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            console.log(`${req.ip} ${req.headers.host}`);
            return { req };
        }
})

server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
