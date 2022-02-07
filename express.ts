const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const port = process.env.PORT || PORT;
const currentDir = process.cwd();

app.use(express.static(path.join(currentDir, 'dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(currentDir, 'dist/index.html'));
});

app.listen(port);
