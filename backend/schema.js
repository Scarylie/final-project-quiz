import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
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

/* [{
    quiz_name: String,
    created_by: String,
    createdAt: time()
    {
    question: String
    question_number: Number,
    Answers: [
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
          ref: "User", // vet inte hur denna fungerar, vet inte heller om vi behöver den
        },
        creatorName: { 
          type: String 
        },
        pointsPerQuestion: {
          type: Number,
          min: 1,
        },
        numberOfQuestions: {
          type: Number,
          default: 0,
        },
        questionList: [{
            pointType: {
              type: String,
              enum: ["Standard", "Double", "BasedOnTime"],
              required: true,
            },
            answerTime: {
              type: Number,
              min: 5,
              max: 90,
            },
            question: {
              type: String,
              required: true,
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

    export const Quiz = mongoose.model("Quiz", QuizSchema)    