import { Schema, model } from 'mongoose';
const FeedSchema = new Schema({
    id: { type: String, unique: true },
    userId: { type: String, require: true },
    image: { type: String, required: true },
    caption: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
const Post = model('posts', FeedSchema);
export default Post;
