import { RecipesModel } from "../models/recipes.model";
import { UserModel } from "../models/user.model";
import mongoose from "mongoose";

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await RecipesModel.find().sort({createdAt: -1});
        res.status(200).json(recipes)
    } catch (err) {
        res.status(500).json({ err: "Error while finding recipes"})
    }
}

const createRecipe = async (req, res) => {
    try {
        const {title, description, cookingTime, instructions, ingredients, imageUrl, email} = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await UserModel.findOne({ email }).session(session)

        if (!user) throw new Error('user not found');

        const newRecipe = await RecipesModel.create({
            title,
            description,
            cookingTime,
            instructions,
            ingredients,
            imageUrl,
            userOwner: user._id
        });
        user.allRecipes.push(newRecipe._id);
        await user.save({session});

        await session.commitTransaction();

        res.status(200).json({ message : "Recipe created"})
    } catch (err) {
        res.status(500).json({ err : "Error recipe not created"})
    }
}

const getOneRecipe = async (req, res) => {
    const { id } = req.params;
    const recipeExist = await RecipesModel.findOne({_id: id})

    if (recipeExist) {
        res.status(200).json(recipeExist);
    } else {
        res.status(400).json({message : "Recipe not found"})
    }
}

const searchRecipe = async (req, res) => {
    const { title = "" } = req.query;
    const query = {};

    if (title) {
        query.title = {$regex: title, $options : "i"}
    }
    try {
        const recipe = await RecipesModel.find(query)
        res.status(200).json(recipe);
    } catch (err) {
        res.status(404).json ({message: err.message})
    }
}

const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const {title, description, cookingTime, instructions, ingredients, imageUrl,} = req.body; 
        await RecipesModel.findByIdAndUpdate(
            {_id: id},
            {
                title,
                description,
                cookingTime,
                instructions,
                ingredients
            }
        )
        res.status(200).json({message: "Recipe updated"})
    } catch (err) {
        res.status(500).json({message: err.message })
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipeToDelete = await RecipesModel.findById({_id: id}).populate("userOwner");

        if (!recipeToDelete) throw new Error('recipe not found')

        const session = await mongoose.startSession();
        session.startTransaction();

        await RecipesModel.deleteOne({ _id: id}).session(session);
        recipeToDelete.userOwner.allRecipes.pull(recipeToDelete);

        await recipeToDelete.userOwner.save({session});
        await session.commitTransaction();

        res.status(200).json({message: "recipe deleted"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

export {getAllRecipes, getOneRecipe, searchRecipe, updateRecipe, deleteRecipe, createRecipe}