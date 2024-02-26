import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "superAdmin", "seller"],
    default: "user",
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  avatar: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.comparePassword = async function(password){
  const user = this;
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) return false;
  return true;
};

export default mongoose.model("User", userSchema);
