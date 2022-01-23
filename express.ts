const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const port = process.env.PORT || PORT;
const currentDir = process.cwd();

app.use(express.static(path.join(currentDir, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(currentDir, 'dist/main-page/main-page.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(currentDir, 'dist/login/login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(currentDir, 'dist/signup/signup.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(currentDir, 'dist/profile/profile.html'));
});

app.get('/server-error', (req, res) => {
  res.sendFile(path.join(currentDir, 'dist/server-error/server-error.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(currentDir, 'dist/not-found/not-found.html'));
});

app.listen(port);