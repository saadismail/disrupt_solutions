const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const app = express();

const usersRoutes = require('./routes/users');

const port = 3000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

app.use('/users', usersRoutes);

// indexRoute
app.get('/', (req,res) => {
  res.send("Invalid Endpoint");
})

app.listen(port, () => {
  console.log("server started @ port: "+port);
})
