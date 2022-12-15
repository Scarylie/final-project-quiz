import express from "express";
import mongoose from "mongoose";

const { Quiz } = require("./quiz");
const { Game } = require("./game")

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 15
    },
    pin: {
      type: [quizSchema]
    }
})

const Player = mongoose.model("Player", PlayerSchema);

/* module.exports = mongoose.model("Player", PlayerSchema) */


    // Player result schema
    const PlayerResultSchema = new mongoose.Schema[{
        playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
          },
          gameId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
          },
          score: {
            type: Number,
            default: 0,
          },
        answers: [{
            questionIndex: { 
              type: Number 
            },
            answered: {
              type: Boolean,
              default: false
            },
            answers: [ String ],
              time: { 
                type: Number 
              },
              points: {
                type: Number,
                default: 0
              },
        }],  
    }]

    export const PlayerResult = mongoose.model("PlayerResult", PlayerResultSchema)


// Routes //

// POST insert pin
const joinGame = async (req, res) => {
// någon form av if angående om pinkoden är aktiv och kopplpat till ett quiz
// då vidare till att skriva in namn 
  const { pin } = req.body;
  try {
  
    if (pin === true && quizId) {
      res.status(400).json({
        success: false,
        response: "Pin needs to match game code",
      });
    } else { // write player name and then JOIN game --> vidare till loading/ wating page
      const newPlayer = await new Player({
        name: name,
        pin: pin
      }).save();
      res.status(201).json({
        success: true,
        response: {
          name: newPlayer.name,
          id: newPlayer._id,
        },
      });
    }
  } catch (error) {
    if (error) {
      res.status(400).json({
        response:
          "Name already exists, please choose another!",
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

// POST name
