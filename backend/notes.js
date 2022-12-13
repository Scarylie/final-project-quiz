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
