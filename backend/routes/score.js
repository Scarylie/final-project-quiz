import express from "express";
import mongoose from "mongoose";

const { Quiz } = require("./quiz");
const { User } = require("./user");

// ************ SCHEMAS & MODELS *************** //

    // Player result schema
    const ScoreSchema = new mongoose.Schema[{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
          },
          score: [
            {
              numberOfCorrect: {
                type: Number,
                default: 0,
              },
              quizTime: {
                type: Number
              }
            }
          ] 
    }]

   const Score = mongoose.model("Score", ScoreSchema)


// ************ ENDPOINTS *************** //

// /username/gameId/scoreID 
// const ScoreBoard

module.exports = { Score };