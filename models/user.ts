import { Schema, model } from 'mongoose';

interface IUser{
    id:String
    fullName:String
    userName:String
    email:String
    followers:String[]
}

const UserSchema = new Schema<IUser>({
    id:String,
    fullName: {type:String,require:true},
    userName: { type: String, required: true },
    email: { type: String, required: true },
    followers: { type:[String]}
});

const User = model<IUser>('users', UserSchema);

export default User;