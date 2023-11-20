import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from 'mongoose';
import Post from '../models/post.js';
import User from '../models/user.js';
const MONGODB = 'mongodb+srv://kunalgaonkar:Mypass123@cluster0.pbkv9n8.mongodb.net/?retryWrites=true&w=majority';
const typeDefs = `#graphql
    type Post {
        _id: String
        userId: String
        image: String
        caption: String
        date:String
       
    }

    type User {
        id: String
        fullName:String
        userName:String
        email:String
        followers:[String]
       
    }


    input UserInput {
        id: String
        fullName:String
        userName:String
        email:String
        followers:[String]
    }

    input FollowUnFollowInput{
        id:String
        followId:String
    }



input PostInput {
        userId: String
        image: String
        caption: String
    }

    type Query {
        getPost(ID: ID!): Post
        getPosts(limit: Int): [Post]!
        getUser(ID: ID!): User
        getUsers(limit: Int): [User]!
    }

    type Mutation {
        createPost(postInput: PostInput): String!
        createUser(userInput: UserInput): String!
        followUnFollowUser(followUnFollowInput:FollowUnFollowInput):String!
    

    }
`;
const resolvers = {
    Query: {
        //To get Post user by id
        async getPost(_, { ID }) {
            return await Post.findById(ID);
        },
        //To get Posts 
        async getPosts(_, { limit }) {
            return await Post.find().limit(limit);
        },
        //To get user by id
        async getUser(_, { ID }) {
            return await User.findOne({ id: ID });
        },
        //To get Posts 
        async getUsers(_, { limit }) {
            return await User.find().limit(limit);
        }
    },
    Mutation: {
        //To create a post
        async createPost(_, { postInput: { userId, image, caption } }) {
            const res = await new Post({ userId, image, caption }).save();
            return res._id;
        },
        //To create a user
        async createUser(_, { userInput: { id, fullName, userName, email, followers } }) {
            const res = await new User({ id, fullName, userName, email, followers }).save();
            return res.id;
        },
        async followUnFollowUser(_, { followUnFollowInput: { id, followId } }) {
            try {
                // Log to see the input values
                console.log("Input:", { id, followId });
                const loggedInUser = await User.findOne({ id: id });
                if (!loggedInUser) {
                    throw new Error("Logged in user not found");
                }
                // Check if the user is already in the followers list
                const indexOfFollowId = loggedInUser.followers.indexOf(followId);
                if (indexOfFollowId !== -1) {
                    // If the user is already followed  remove them
                    loggedInUser.followers.splice(indexOfFollowId, 1);
                    // Save the updated user
                    await loggedInUser.save();
                    return "User unfollowed successfully";
                }
                else {
                    // If the user is not in the followers list, add them
                    loggedInUser.followers.push(followId);
                    // Save the updated user
                    await loggedInUser.save();
                    return "User followed successfully";
                }
            }
            catch (error) {
                console.error(error);
                throw new Error("Failed to follow user");
            }
        }
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
