import bcrypt from "bcrypt";

import { User } from "./schema"

app.post("/register", async (req, res) => { // in the frontend "register" and "login" are at the same endpoint, so this does not work
    const { username, password/* , email */ } = req.body;
      try {
        const salt = bcrypt.genSaltSync();
        if (password.length < 5) {
          res.status(400).json({
            success: false,
            response: "Password must be at least 5 characters long"
          })
        } else {
          const newUser = await new User({username: username, password: bcrypt.hashSync(password, salt)}).save();
          res.status(201).json({
            success: true,
            response: {
              username: newUser.username,
              accessToken: newUser.accessToken,
              id: newUser._id
            }
          });
        }
      } catch(error) {
        res.status(400).json({
          success: false,
          response: error // vi måste fixa så error syns i frontend
        });
      }
  });
  
  app.post("/login", async (req, res) => {
    const { username, password/* , email */ } = req.body;
    try {
      const user = await User.findOne({username});
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          success: true,
          response: {
            username: user.username,
            accessToken: user.accessToken,
            id: user._id
          }
        });
      } else {
        res.status(400).json({
          success: false,
          response: "Incorrect username or password. Type the correct username and password, and try again."
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        response: error
      });
    }
  });