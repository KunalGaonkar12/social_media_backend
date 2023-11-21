import { Schema, model } from 'mongoose';

interface IPost{
    id?:String
    userId:String
    userName:String
    image:String
    caption:String
    date:Number
    tags:String[]
}

const FeedSchema = new Schema<IPost>({
    id:String,
    userId: {type:String,require:true},
    image: { type: String, required: true },
    userName: { type: String, required: true },
    caption: { type: String, required: true },
    date: { type: Date,default:Date.now },
    tags:{type:[String]}
});

const Post = model<IPost>('posts', FeedSchema);

export default Post;