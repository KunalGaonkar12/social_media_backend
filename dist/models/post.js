import { Schema, model } from 'mongoose';
const FeedSchema = new Schema({
    id: String,
    userId: { type: String, require: true },
    image: { type: String, required: true },
    userName: { type: String, required: true },
    caption: { type: String, required: true },
    date: { type: Date, default: Date.now },
    tags: { type: [String] }
});
const Post = model('posts', FeedSchema);
export default Post;
