import USERMODEL from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt);
    const user = await USERMODEL.create({ email, password: hashpass });
    res.status(200).json({ message: user });
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await USERMODEL.find();
    res.status(200).json({ message: users });
  } catch (e) {
    console.log(e);
  }
};

export const updateUser = async (req, res) => {
  const { oldEmail, newEmail } = req.body;
  try {
    const oldUser = await USERMODEL.findOne({ email: oldEmail });
    oldUser.email = newEmail;
    await oldUser.save();
    res.status(200).json({ message: oldUser });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    await USERMODEL.deleteOne({ email });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err, "error is here");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await USERMODEL.findOne({ email: email });
    if (!user) {
      res.json({ message: "User not found" });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ _id: user._id }, "ABHINAV");
      res.json({
        message: "User logged in successful",
        USER: user,
        token: token,
      });
      return;
    }
    res.json({ message: "Password does not match" });
  } catch (err) {
    console.log(err);
  }
};
