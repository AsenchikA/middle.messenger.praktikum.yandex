const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const currentDir = process.cwd();

app.get('/', (req, res) => {
  res.sendFile(path.join(currentDir, 'dist/pages/main-page/main-page.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(currentDir, 'dist/pages/login/login.html'));
});

app.get('/registration', (req, res) => {
  res.sendFile(path.join(currentDir, 'dist/pages/signin/signin.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(currentDir, 'dist/pages/profile/profile.html'));
});

app.get('/server-error', (req, res) => {
  res.sendFile(path.join(currentDir, 'dist/pages/server-error/server-error.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(currentDir, 'dist/pages/not-found/not-found.html'));
});

app.listen(PORT); 