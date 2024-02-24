import User from "../models/User.js";
exports = {
  async createUser(
    firstName,
    lastName,
    email,
    password,
    address,
    phoneNumber,
    avatar
  ) {
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber,
      avatar,
    });
    return await user.save();
  },
  async getUser(email, username, id) {
    if (id) return await User.findById(id);
    else if (email) return await User.findOne({ email });
    return await User.findOne({ username });
  },

};
