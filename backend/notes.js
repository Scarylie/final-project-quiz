/////////////////////// TEST server.js //////////////////
/* 
export const UserSchema = new mongoose.Schema({
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
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },

/* const User = mongoose.model("User", UserSchema); */

// här är det const istället för "app.get" osv och så ligger "app.get" i server.js och vi måste inportera consten
/* export const RegisterUser */
/* 
app.post("/register", async (req, res) => {
  // in the frontend "register" and "login" are at the same endpoint, so this does not work
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 5) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 5 characters long",
      });
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt),
      }).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error, // vi måste fixa så error syns i frontend
    });
  }
});
/////////////////////// TEST ////////////////// */

//////////////////////// från 1:1 med Daniel //////////////////////

/* import express from "express";
import mongoose from "mongoose";

const { } = require("./quiz");

const gameSchema = new mongoose.Schema({
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
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



  // start a new game:

  // endpoint 
  
// startFunc
// quizId, or array of quizIds
const startGame = async (hostId, quizId) => {
  // create unique pin here 

  const newGame = await new Game(hostId, quizId, uniquePIN);

  /// return to frontend client:
  return {
    response: {
      // return a full quiz object??

      // return gameId, and link to share

    }
  }

} */

/// whenever someone enters game screen => request to backend, find game with UNIQUE!!!! pin,
// return a quiz object => quiz object is found
// after last player completes the quiz, or expiration date  comes -> pin expires

// store the pin - sicka länk med ID och när id matchar med PINkod så kommer man in i spelet

// from Daniel helping us during class
const quizObject = {
  title: title,
  author: author,
};
questions.foreach(async (singleQuestion) => {
  const answers = [];
  singleQuestion.answers.foreach(async (answer) => {
    const singleAnswer = await new Answers(answer);
    answers.push(singleAnswer).save();
  });
  const question = await new Questions({
    question: singleQuestion.question,
    answers: answers,
  }).save();
  quizObject.questions.push(question);
});
