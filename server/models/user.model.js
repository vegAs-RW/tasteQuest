import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, requried: true, unique: true },
    password: { type: String, required: true},
   /*isAdmin: {type: Boolean, required: true}*/
})

export const UserModel = mongoose.model("users", UserSchema)