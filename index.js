const express = require('express');
const app = express();

app.get('/movies', (req, res) => {
    res.json(topTenMovies);
  });