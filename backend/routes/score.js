import express from "express";
import mongoose from "mongoose";

const { Quiz } = require("./quiz");
const { User } = require("./user");

// ************ SCHEMAS & MODELS *************** //

// Player result schema
const ScoreSchema = new mongoose.Schema({
  player: {
    type: String,
  },
  quizId: {
    type: String,
  },
  score: { type: Number },
});

const Score = mongoose.model("Score", ScoreSchema);

// ************ ENDPOINTS *************** //

// GET Single Quiz //
const getScore = async (req, res) => {
  try {
    const oneScore = await Score.find({ quizId: req.params.id });

    if (oneScore) {
      res.status(200).json({ success: true, response: oneScore });
    } else {
      res.status(404).json({ error: "Score not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid score id" });
  }
};

// POST //
const addScore = async (req, res) => {
  const { player, quizId, score } = req.body;

  try {
    const newScore = await new Score({
      player,
      quizId,
      score,
    });
    newScore.save();
    res.status(201).json({ success: true, response: newScore });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, response: "Failed to add score", error: error });
  }
};

module.exports = { addScore, getScore, ScoreSchema };
