const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const turtleSchema = new Schema({
  name: String,
  role: String,
});
const Turtle = model('Turtle', turtleSchema);

module.exports = Turtle;
