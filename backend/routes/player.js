import express from "express";
import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true,
        maxlength: 15
    },
    pin: {

    }
})

// from repo on github:
const gameSchema = new mongoose.Schema({
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    pin: {
      type: String,
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    playerList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    playerResultList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PlayerResult",
      },
    ],
  });
  
  module.exports = mongoose.model("Game", gameSchema);


  