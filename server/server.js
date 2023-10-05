import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname} from 'path'
import path from 'path'

import ('./config/db.js')


import { authRouter } from './routes/auth.routes.js'
import { recipeRouter } from './routes/recipes.routes.js';
import { userRouter } from './routes/users.routes.js';

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cookieParser())
app.use(cors(corsOptions));

app.use("/auth", authRouter);
app.use("/user", userRouter)
app.use("/recipes", recipeRouter)

const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;
app.listen(PORT, () => {
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});
