import mongoose from "mongoose";

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then (() => console.log("Connected to mongoDb"))
.catch ((err) => console.log("Failed to connect to mongoDb"))