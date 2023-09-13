import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, requried: true, unique: true },
    password: { type: String, required: true},
    /*allRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipes' }],
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipes' }],*/
})

export const UserModel = mongoose.model("users", UserSchema)