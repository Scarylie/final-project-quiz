import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      enum: [ "admin", "player" ], 
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: { // i havent jused this one, so not sure it works 
        validator: (value) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        },
        message: "Please enter a valid email address"
      }
    },
    accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString("hex")
    }
  }); // for frontend: if the user exist promt an alert och someting 

export const User = mongoose.model("User", UserSchema)

// schema for creating quiz and answers