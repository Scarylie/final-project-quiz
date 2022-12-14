import express from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

/// SCHEMAS ///

// User Schema //
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please add a username"],
    unique: true,
    lowercase: true,
    maxlength: 15,
  },
  password: { type: String, required: true },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add valid email",
    ],
  },
});
const User = mongoose.model("User", UserSchema);

/// END POINTS ///
// Registration //
const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 8 characters long",
      });
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt),
        email: email,
      }).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        response:
          "Username or email already exists, please choose another username!",
        error: error,
        success: false,
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Something went wrong",
        error: error,
      });
    }
  }
};

// Log in //
const logInUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials didn't match",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
    });
  }
};

// Authentication //
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken: accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
};

module.exports = { registerUser, logInUser, authenticateUser };
