import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    id: String,
    fullName: { type: String, require: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    followers: { type: [String] }
});
const User = model('users', UserSchema);
export default User;
