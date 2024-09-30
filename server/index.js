import express, { json } from "express";
const app = express();
import { connect } from "mongoose";
import cors from "cors";
import User from "./models/User.js";

const port = 5000;

app.use(cors());
app.use(json());

const pass = "JlmwFaYa0WZ74A9I";
const name = "mongodb+srv://bakery-easy:";
const link =
  "@cluster0.t8k51.mongodb.net/userdb?retryWrites=true&w=majority&appName=Cluster0";
const conectbco = name + pass + link;

connect(conectbco)
  .then((res) => console.log(`Connection Success in DB Cloud ${res}`))
  .catch((err) =>
    console.log(`Error in connection with DataBase MongoDB ${err}`)
  );

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((registers) => {
    if (registers) {
      if (registers.password === password) {
        res.json("Success");
      } else {
        res.json("Password incorrect");
      }
    } else {
      res.json("unregistered user");
    }
  });
});

app.post("/register", (req, res) => {
  User.create(req.body)
    .then((register) => res.json(register))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Server app is listening at ${port}`);
});
