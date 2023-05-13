import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoute.js";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());

const mongoUrl =
  "mongodb+srv://iabhinav2000:1234@cluster0.5plbygl.mongodb.net/?retryWrites=true&w=majority";

app.use("/", router);

const connectToDb = async () => {
  try {
    await mongoose.connect(mongoUrl);
    app.listen(3000, () => {
      console.log("Mongoose connected and server listening on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
};

connectToDb();
