import mongoose from "mongoose";
import apiError from "../utils/apiError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
  // console.log(process.env.ACCESS_TOKEN)
  const response = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      gender: this.gender,
      dob: this.dob,
      username: this.username,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  return response
};


userSchema.methods.generateRefreshToken = function () {
  // console.log(process.env.REFRESH_TOKEN)
  const response = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      gender: this.gender,
      dob: this.dob,
      username: this.username,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );

  return response
};



userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const response = await bcrypt.hash(this.password, 11);
    this.password = response;
    next();
  } catch (error) {
    throw new apiError("This is we not you", 200);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  const isVerified = await bcrypt.compare(password, this.password);
  return isVerified;
};

export const User = mongoose.model("User", userSchema);

// schema.methods → for document-level logic  means at the instance for which user we are talking
// schema.statics → for model-level logic means it is global it is called for the all user docs here we dont have access of this.
