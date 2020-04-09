const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();
server.use(logger);


server.use(express.json());
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to my API!</h2>`);
});

//custom middleware


module.exports = server;

function logger(req, res, next) {
  console.log(`Request to: ${req.method} to ${req.originalUrl}`)
  next();
};

