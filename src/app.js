const express = require("express");
const cors = require('cors');
const PORT = 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(require('./routes.js'));

app.listen(process.env.PORT || PORT);