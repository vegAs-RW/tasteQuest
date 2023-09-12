import { RecipesModel } from "../models/recipes.model.js";
import { UserModel } from "../models/user.model.js";
import mongoose from "mongoose";
/*
const getAllRecipes = async (req, res) => {
    const { title = "" } = req.query;
    const query = {};

    if (title) {
        query.title = {$regex: title, $options : "i"}
    }
    try {
        const recipe = await RecipesModel.find(query)
        res.status(200).json(recipe);
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
        console.log(user.allRecipes);
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


const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const {title, description, cookingTime, instructions, ingredients} = req.body; 
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

export {getAllRecipes, getOneRecipe, updateRecipe, deleteRecipe, createRecipe}
*/

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await RecipesModel.find();
        res.status(200).json(recipes)
    } catch (err) {
        res.status(500).json(err)
    }
}

const createRecipe = async (req, res) => {
    const {title, description, cookingTime, instructions, ingredients, imageUrl, userOwner} = req.body;

    const recipe = new RecipesModel({
        title,
        description,
        cookingTime,
        instructions,
        ingredients,
        imageUrl,
        userOwner
    });

    try {
        await recipe.save();
        res.status(201).json({message: "Recipe created"})
    } catch (err){
        res.status(500).json({message: "Error recipe not created"})
    }
}

const getOneRecipe = async (req, res) => {
    const {id} =req.params;

    try {
        const recipe = await RecipesModel.findById({ _id: id});
        res.status(200).json(recipe);
    } catch (err) {
        res.status(400).json({message: "Recipe not found"})
    }
}

const saveRecipe = async (req, res) => {
    const recipe = await RecipesModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);

    try {
        user.savedRecipes.push(recipe);
        await user.save();
        res.status(201).json({savedRecipes : user.savedRecipes})
    } catch (err) {
        res.status(500).json(err)
    }
}

const getSavedRecipes = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        const savedRecipes = await RecipesModel.find({
            _id: {$in: user.savedRecipes}
        })
        console.log(savedRecipes);
        res.status(201).json({savedRecipes})
    } catch (err) {
        res.status(500).json(err)
    }
}

export {getAllRecipes, getOneRecipe, getSavedRecipes, saveRecipe, createRecipe}