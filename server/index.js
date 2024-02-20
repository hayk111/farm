const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let animals = [];

app.get('/api/animals', (req, res) => {
  res.json(animals);
});

app.post('/api/animals', (req, res) => {
  const newAnimal = req.body;

  if (animals.some(animal => animal.name === newAnimal.name)) {
    return res.status(400).json({ error: 'Animal with this name already exists.' });
  }

  animals.push(newAnimal);
  res.json(animals);
});

app.delete('/api/animals/:name', (req, res) => {
  const animalNameToRemove = req.params.name;

  animals = animals.filter(animal => animal.name !== animalNameToRemove);
  res.json(animals);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});