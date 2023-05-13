import USERMODEL from "../model/userModel.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await USERMODEL.create({ email, password });
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
  console.log(email);
  try {
    await USERMODEL.deleteOne({ email });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err, "error is here");
  }
};
