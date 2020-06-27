const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    input MessageInput {
        content: String
        author: String
    }

    type Message {
        id: ID!
        content: String
        author: String
    }

    type Query {
        getMessage(id: ID!): Message
    }

    type Mutation {
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
    }
`;

class Message {
    constructor(id, {content, author}) {
        this.id = id;
        this.content = content;
        this.author = author;
    }
}

const fakeDatabase = {};

const resolvers = {
    Mutation: {
        createMessage: (_, {input}) => {
            // Create a random id for our "database".
            var id = require('crypto').randomBytes(10).toString('hex');

            fakeDatabase[id] = input;
            return new Message(id, input);
        },
        updateMessage: (_, {id, input}) => {
            if (!fakeDatabase[id]) {
                throw new Error('no message exists with id ' + id);
            }
            // This replaces all old data, but some apps might want partial update.
            fakeDatabase[id] = input;
            return new Message(id, input);
        },
    },
    Query: {
        getMessage: (_, {id}) => {
            if (!fakeDatabase[id]) {
                throw new Error('no message exists with id ' + id);
            }
            return new Message(id, fakeDatabase[id]);
        },
    }
};

const server = new ApolloServer({typeDefs, resolvers})

server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
