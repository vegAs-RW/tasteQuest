import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import ('./config/db.js')

import { authRouter } from './routes/auth.routes.js'
import { recipeRouter } from './routes/recipes.routes.js';
import { userRouter } from './routes/users.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/user", userRouter)
app.use("/recipes", recipeRouter)




const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;
app.listen(PORT, () => {
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});
