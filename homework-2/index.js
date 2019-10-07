var express = require('express');
var app = express();
let isShowDate = false;
let args = process.argv.slice(2);
let interval = args[0] || 1000;
let timeout = args[1] || 5000;

app.get('/start', (req, res) => {
  res.send('timer start');
  isShowDate = true;
});
app.get('/stop', (req, res) => {
  setTimeout(() => {
    res.send(new Date().toUTCString());
    isShowDate = false;
  }, timeout);
});

app.listen(3000, function() {
  setInterval(() => {
    if (isShowDate) console.log(new Date().toUTCString());
  }, interval);
});
