// load .env data into process.env
require('dotenv').config();
const path = require('path');

// Web server config
const PORT = process.env.PORT || 3322;
// const sassMiddleware = require("node-sass-middleware");
const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const app = express();

const morgan = require('morgan');
const cookieSession = require('cookie-session');
const db = require('./db');

// // PostgreSQL database client/connection setup
// const { Pool } = require("pg");
// const dbParams = require("./lib/db.js");
// const db = new Pool(dbParams);
// db.connect();

// Sockets for chat
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const cors = require('cors');

// routes
const users = require('./routes/users');
const boards = require('./routes/boards');
const reports = require('./routes/reports');
// const tasks = require("./routes/tasks");s
// const users_tasks = require("./routes/users_tasks");

// app.use("/api", days(db));

app.use(morgan('dev'));

app.use(cors());
// app.use(helmet()); // needed?
app.use(bodyparser.json()); // needed?

app.use('/users', users(db));
app.use('/boards', boards(db));
app.use('/reports', reports(db));
// app.use("/tasks", tasks(db));
// app.use("/users_tasks", users_tasks(db))

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

// app.use(express.static('public'));
const distDir = __dirname + '/client/';
app.use(express.static(distDir));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const usersRoutes = require("./routes/users");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users",usersRoutes(db) );

// Note: mount other resources here, using the same pattern above
// const loginRouter = require("./routes/login");
// app.use("/login", loginRouter);

// app.get('/', (req, res) => {
//   res.redirect('../client/src/index.js');
// });

// localhost:3000/focal
app.get('/focal', (req, res) => {
  res.send('this work? it does');
});

// For sockets change from app.listen to server.listen
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3006',
    method: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  db.query(`SELECT * FROM messages ORDER BY id DESC;`).then(response => {
    const allMessages = response.rows;

    io.emit('allMessages', { allMessages });
  });

  socket.on('getMessages', () => {
    db.query(`SELECT * FROM messages ORDER BY id DESC;`).then(response => {
      const allMessages = response.rows;

      io.emit('allMessages', { allMessages });
    });
  });

  socket.on('sendMessage', data => {
    const { message, userLS, user_ls_avatar } = data;

    db.query(
      `insert into messages (userLS, message, user_ls_avatar) values ($1, $2, $3);`,
      [userLS, message, user_ls_avatar]
    ).then(
      db.query(`SELECT * FROM messages ORDER BY id DESC;`).then(response => {
        const allMessages = response.rows;

        io.emit('allMessages', { allMessages });
      })
    );

    io.emit('notification', {
      userLS: data.userLS,
      user_ls_avatar: data.user_ls_avatar,
    });
    // console.log('emit notification');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected...');
    socket.disconnect();
  });
  // socket.disconnect(); // This line to be commented out when chat is used.
});

app.use('*', express.static(path.join(__dirname, '../build')));
app.use('/', express.static(path.join(__dirname, '../build')));

server.listen(PORT, () => {
  console.log(`Focal app listening on port ${PORT}`);
});
