// Dependencies
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Turtle = require('./models/Turtle');
const turtleSeed = require('./models/turtleSeed');

// Create the application object
const app = express();

// Create the DB connection
const DATABASE_URL = process.env.DATABASE_URL;
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DATABASE_URL, config);
mongoose.connection
  .on('open', () => console.log('Connected to database!'))
  .on('close', () => console.log('Disconnected from database!'))
  .on('error', (err) => console.log(err));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Home Route
app.get('/', (req, res) => {
  res.redirect('/turtles');
});

// INDUCES
// Index Route
app.get('/turtles', async (req, res) => {
  const turtles = await Turtle.find({});
  res.json(turtles);
});

// Seed Route
app.get('/turtles/seed', async (req, res) => {
  await Turtle.deleteMany({}).catch((err) => res.send(err));
  const turtles = await Turtle.create(turtleSeed).catch((err) => res.send(err));
  res.json(turtles);
});

// Delete Route
app.delete('/turtles/:id', async (req, res) => {
  await Turtle.findByIdAndDelete(req.params.id).catch((err) => res.send(err));
  res.redirect('/turtles');
});

// Update Route
app.put('/turtles/:id', async (req, res) => {
  const turtle = await Turtle.findByIdAndUpdate(req.params.id, req.body).catch(
    (err) => res.send(err)
  );
  await turtle.save();
  res.redirect('/turtles');
});

// Create Route
app.post('/turtles', async (req, res) => {
  await Turtle.create(req.body).catch((err) => res.send(err));
  res.redirect('/turtles');
});

// Show Route
app.get('/turtles/:id', async (req, res) => {
  const turtle = await Turtle.findById(req.params.id).catch((err) =>
    res.send(err)
  );
  res.json(turtle);
});

// Listener
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`You're connected on port ${PORT}!`);
});
