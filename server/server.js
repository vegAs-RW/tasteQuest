import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import ('./config/db.js')

import {userRouter} from './routes/users.routes.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);


const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;
app.listen(PORT, () => {
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});
