import { Schema, model } from 'mongoose';

interface IPost{
    id?:String
    userId:String
    image:String
    caption:String
    date:Number
}

const FeedSchema = new Schema<IPost>({
    id:String,
    userId: {type:String,require:true},
    image: { type: String, required: true },
    caption: { type: String, required: true },
    date: { type: Date,default:Date.now }
});

const Post = model<IPost>('posts', FeedSchema);

export default Post;