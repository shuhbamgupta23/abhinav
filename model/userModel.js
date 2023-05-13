import mongoose from "mongoose";

const Model = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const USERMODEL = mongoose.model("chrolloUser", Model);

export default USERMODEL;
