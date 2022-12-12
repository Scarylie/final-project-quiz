import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 15
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

/* [{
    quiz_name: String,
    created_by: String,
    createdAt: time()
    {
    question: String
    question_number: Number,
    answerList: [
    {
    answer_one: String,
    correct: Boolean
    image_url: String
    },
    {
    answer_two: String,
    correct: Boolean
    },
    {
    answer_three: String,
    correct: Boolean
    },
    {
    answer_four: String,
    correct: Boolean
    },
    ]
    },
    }] */

    const QuizSchema = new mongoose.Schema[{
        name: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          maxlength: 40
        },
        createdAt: {
          type: Date,
          default: () => new Date()
        },
        creatorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User" // kopplar denna till User Schema
        },
        creatorName: { 
          type: String 
        },
      /*   pointsPerQuestion: {
          type: Number,
          min: 1
        }, */
        numberOfQuestions: {
          type: Number,
          default: 0
        },
        questionList: [{
       /*      pointType: {
              type: String,
              enum: ["Standard", "Double", "BasedOnTime"],
              required: true
            },
            answerTime: {
              type: Number,
              min: 5,
              max: 90
            }, */
            question: {
              type: String,
              required: true
            },
            answerList: [{
              name: { 
                type: String 
              },
              body: { 
                type: String 
              },
              isCorrect: { 
                type: Boolean 
              }
            }],
            questionIndex: { 
                type: Number, 
                required: true 
            }
        }],
    }];

    //vet inte om det räcker med answerList ovan eller om vi behöver lägga till detta också
    // correctAnswersList: [
      //   {
      //     name: { type: String },
      //     body: { type: String },
      //   },
      // ],
      // answerList: [
      //   {
      //     name: { type: String },
      //     content: { type: String },
      //   },
      // ],
      // correctAnswer: [
      //   {
      //     name: { type: String },
      //     content: { type: String },
      //   },
      // ],

    export const Quiz = mongoose.model("Quiz", QuizSchema)

    // When the game is in play
    const GameSchema = new mongoose.Schema({
        hostId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        quizId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz"
        },
        pin: {
          type: String,
        },
        isLive: {
          type: Boolean,
          default: false
        },
        playerList: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player"
          }],
        date: {
          type: Date,
          required: true,
          default: () => new Date()
        },
      /*   playerResultList: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "PlayerResult"
          }] */
      });

    export const Game = mongoose.model("Game", GameSchema)

    //Player schema
    const PlayerSchema = new mongoose.Schema[{
        name: {
          type: String,
          required: true
        },
        pin: {
          type: String,
          required: true
        }
      }];

    export const Player = mongoose.model("Player", PlayerSchema)
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
