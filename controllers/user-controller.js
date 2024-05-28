const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "john doe",
    email: "johndoe123@gmail.com",
    password: "test123",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signUp = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.json({
      error:
        "Name, email can not be blank and password must me of atleast 5 characters.",
    });
  }
  const { name, email, password } = req.body;
  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    res
      .status(422)
      .json({ error: "User already exists with the same email id." });
  }
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(newUser);
  res.status(201).json({ newuser: newUser });
};

const logIn = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.json({
      error:
        "Email can not be blank and password must be of atleast 5 characters.",
    });
  }
  const { email, password } = req.body;
  const existingUser = DUMMY_USERS.find((u) => u.email === email);
  if (!existingUser || existingUser.password !== password) {
    res.status(401).json({ error: "Invalid credentials enetered." });
  }
  res.status(200).json({ message: "Login successful..." });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;