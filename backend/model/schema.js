import mongoose from "mongoose";
import crypto from "crypto";

//to validate the email when signing up/in
/* const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}; */

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please add a username"],
    unique: [true, "user name already exists"],
    minlength: 5,
    maxlength: 15,
  },
  password: {
    type: String,
    required: [true, "please add a password"],
  },
  /* email: {
    type: String,
    required: [true, "please add an email"], // Do we want required or not?
    unique: true,
    // trim: true, // This is included in match
    lowercase: true,
    validate: [validateEmail, "Please add valid email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add valid email",
    ], //will detect if there are spaces in emails, no domains at all, or no period before .com
  }, */
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },

  //vi behöver få in typ "min sida" eller något sådant ? som är länkat till användaren
});

/* export const User = mongoose.model("User", UserSchema); */

// Schema for creating questions and answers to Quiz
const QuizSchema = new mongoose.Schema[
  {
    quizName: {
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
    questionList: [
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
  answerList: {
    type: AnswerSchema,
    minlength: 2,
    maxlength: 4,
  },
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
