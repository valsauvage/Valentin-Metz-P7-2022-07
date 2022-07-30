const express = require("express");
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");
const path = require('path');

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(cookieParser());


app.use('/upload', express.static(path.join(__dirname, 'upload')));

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});


// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;