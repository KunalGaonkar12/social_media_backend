import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from 'mongoose';
import Post from '../models/post.js';
const MONGODB = 'mongodb+srv://kunalgaonkar:Mypass123@cluster0.pbkv9n8.mongodb.net/?retryWrites=true&w=majority';
const typeDefs = `#graphql
    type Post {
        _id: String
        userId: String
        image: String
        caption: String
        date:String
       
    }

input PostInput {
        userId: String
        image: String
        caption: String
    }

    type Query {
        getPost(ID: ID!): Post
        getPosts(limit: Int): [Post]!
    }

    type Mutation {
        createPost(postInput: PostInput): String!

    }
`;
const resolvers = {
    Query: {
        async getPost(_, { ID }) {
            return await Post.findById(ID);
        },
        async getPosts(_, { limit }) {
            return await Post.find().limit(limit);
        }
    },
    Mutation: {
        async createPost(_, { postInput: { userId, image, caption } }) {
            const res = await new Post({ userId, image, caption }).save();
            return res._id;
        },
    }
};
await connect(MONGODB);
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const port = Number.parseInt(process.env.PORT) || 4000;
const { url } = await startStandaloneServer(server, {
    listen: { port: port }
});
console.log(`Server is ready at ${url}`);
