import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    unique: [true, "Username has been taken!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "Email has been taken!"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email! example: foo@example.com",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [6, "Password must be at least 6 characters!"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (reqBody) {
  return await bcrypt.compare(reqBody, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
