// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Read comments from file
const readComments = () => {
  const comments = fs.readFileSync('comments.json');
  return JSON.parse(comments);
};

// Write comments to file
const writeComments = (comments) => {
  fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
};

// Middleware for parsing request body
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  const comments = readComments();
  res.json(comments);
});

// Add new comment
app.post('/comments', (req, res) => {
  const comments = readComments();
  const newComment = req.body;
  comments.push(newComment);
  writeComments(comments);
  res.json(newComment);
});

// Start server
app.listen(3000);