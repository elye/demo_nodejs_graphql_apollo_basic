const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
    }
`;

const resolvers = {
    Query: {
        quoteOfTheDay: () => {
            return Math.random() < 0.5 ?
                'Take it easy' : 'Salvation lies within';
        },
        random: () => {
            return Math.random();
        },
        rollThreeDice: () => {
            return [1, 2, 3]
                .map(_ => 1 + Math.floor(Math.random() * 6));
        },
    }
};

const server = new ApolloServer({typeDefs, resolvers})

server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
