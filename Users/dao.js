import model from "./model.js";

export const findAllUsers = () => model.find();
export const findUsersByRole = (role) => model.find({ role: role });
export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i");
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};
export const findUserById = (userId) => model.findById(userId);

export const createUser = async (user) => {
  return model.create(user);
};

export const findUserByUsername = async (username) => {
  return model.findOne({ username });
};
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = async (userId) => {
  return model.deleteOne({ _id: userId });
};
