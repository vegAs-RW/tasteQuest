import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, requried: true },
    password: { type: String, required: true},
    allRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
})

export const UserModel = mongoose.model("users", UserSchema)