// load .env data into process.env
// require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 3001;
// const sassMiddleware = require("node-sass-middleware");
const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieSession = require('cookie-session');

// Sockets for chat
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const cors = require("cors");
app.use(cors());

// PostgreSQL database client/connection setup
// const { Pool } = require("pg");
// const dbParams = require("./lib/db.js");
// const db = new Pool(dbParams);
// db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// app.use(
//   "/styles",
//   sassMiddleware({
//     source: __dirname + "/styles",
//     destination: __dirname + "/public/styles",
//     isSass: false, // false => scss, true => sass
//   })
// );

// setup cookie session
app.use(
  cookieSession({
    name: 'session',
    keys: [
      'C&F)J@Nc',
      '9y$B&E)H',
      's6v9y/B?',
      'Xp2s5v8y',
      'fUjXn2r5',
      'McQfTjWn',
      '(H+MbQeT',
      'A?D(G+Kb',
      '8x!A%D*G',
      'r4u7w!z%',
    ],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const usersRoutes = require("./routes/users");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users",usersRoutes(db) );

// Note: mount other resources here, using the same pattern above
// const loginRouter = require("./routes/login");
// app.use("/login", loginRouter);

app.get('/', (req, res) => {
  res.redirect('../client/src/index.js');
});

// localhost:3000/focal
app.get('/focal', (req, res) => {
  res.send('this work?');
});

// For sockets change from app.listen to server.listen
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    // Save message to DB here?
    io.emit("receiveMessage", data);
  });
});

server.listen(PORT, () => {
  console.log(`Focal app listening on port ${PORT}`);
});
