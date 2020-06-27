const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        rollDice(numDice: Int!, numSides: Int): [Int]
    }
`;

const resolvers = {
    Query: {
        rollDice: (_, {numDice, numSides}) => {
            var output = [];
            for (var i = 0; i < numDice; i++) {
                output.push(1 + Math.floor(Math.random()
                    * (numSides || 6)));
            }
            return output;
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers})

server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
