import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import session from "express-session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173", // Adjust as needed
    credentials: true, // Allow credentials if needed
  })
);
app.use(json());
app.use(
  session({
    secret: "sdssf",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// GOOGLE AUTH
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "605946983160-vf0d2e27pj7601kv82b91ut7m6mlk8t3.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // Creating a user without a password for Google login
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            authType: "google",
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

const pass = "lsMZn83HM0dRtXpr";
const name = "mongodb+srv://bakery-easy:";
const link =
  "@cluster0.t8k51.mongodb.net/userdb?retryWrites=true&w=majority&appName=Cluster0";
const conectbco = name + pass + link;

connect(conectbco)
  .then((res) => console.log(`Connection Success in DB Cloud ${res}`))
  .catch((err) =>
    console.log(`Error in connection with DataBase MongoDB ${err}`)
  );

const JWT_SECRET = "absdjsjdsks"; // Change this to a strong secret and keep it safe

// Auth with Google
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback route for Google to redirect to
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/", // Redirect here on failure
  }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign({ id: req.user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Redirect to frontend with the token in the query string
    res.redirect(`http://localhost:5173/?token=${token}`);
  }
);

// Register route (hashed password)
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json(err);
  }
});

// Login route (compare password and return JWT)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.json({ token });
      } else {
        return res.status(400).json("Password incorrect");
      }
    } else {
      return res.status(400).json("unregistered user");
    }
  } catch (err) {
    console.log("Error during login:", err);
    res.status(500).json(err);
  }
});

// Protected Route Example
app.get("/protected", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json("Access denied");
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Protected route accessed", user: verified });
  } catch (err) {
    res.status(403).json("Invalid token");
  }
});

// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Server app is listening at ${port}`);
});
