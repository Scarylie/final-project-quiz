import mongoose from "mongoose";
import crypto from "crypto";

// Schema for creating questions and answers to Quiz
const QuizSchema = new mongoose.Schema[
  {
    title: {
      type: String,
      required: true, // eller något default om man inte fyller i
      unique: true,
      trim: true,
      maxlength: 40,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId, // if we want: display name?
      ref: "User", // kopplar denna till User Schema
    },
    questions: [
      {
        type: QuestionSchema, //kopplar till detta schema ovan
      },
    ],
  }
]();

export const Quiz = mongoose.model("Quiz", QuizSchema);

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  questionIndex: {
    type: Number,
    default: 0,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  answers: [
    {
      type: AnswerSchema,
      minlength: 2,
      maxlength: 4,
    },
  ],
  answerTime: {
    type: Number,
    min: 5,
    max: 60,
  },
  pointsPerQuestion: {
    type: Number,
    min: 1,
  },
  /*     pointType: {
    type: String,
    enum: ["Standard", "Double", "BasedOnTime"],
    required: true
    }, */
});

const AnswerSchema = new mongoose.Schema({
  answer: {
    type: String,
    unique: true,
    required: true,
  },
  isCorrect: {
    type: Boolean,
  },
});

// When the game is in play
const GameSchema = new mongoose.Schema({
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
      ref: "Player",
    },
  ],
  /*       date: {
          type: Date,
          required: true,
          default: () => new Date()
        }, */
  playerResultList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayerResult",
    },
  ],
});

export const Game = mongoose.model("Game", GameSchema);

//Player schema
const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
});
export const Player = mongoose.model("Player", PlayerSchema);

//////////////////////////////////////////////////////////////////////////

// schemas from similar projects
/* 
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
            answers: [ String
                // {
                //   name: { type: String },
                //   body: { type: String },
                // },
              ],
              // correctAnswers: [
              //   {
              //     name: { type: String },
              //     body: { type: String },
              //   },
              // ],
              time: { 
                type: Number 
              },
              points: {
                type: Number,
                default: 0
              },
        }],  
    }]

    export const PlayerResult = mongoose.model("PlayerResult", PlayerResultSchema) */

// const questionSchema = new mongoose.Schema({
//   topic: {
//     type: String,
//     required: true,
//   },
//   subtopic: {
//     type: String,
//     required: true,
//   },
//   question: {
//     type: String,
//     required: true,
//   },
//   option1: {
//     type: String,
//     required: true,
//   },
//   option2: {
//     type: String,
//     required: true,
//   },
//   option3: {
//     type: String,
//     required: true,
//   },
//   option4: {
//     type: String,
//     required: true,
//   },
//   correctOption: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     default: "",
//     required: false,
//   },
// });
