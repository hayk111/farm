const express = require('express');
const router = express.Router();

let animals = [];

router.get('/', (req, res) => {
  res.json(animals);
});

router.post('/', (req, res) => {
  const newAnimal = req.body;

  if (animals.some(animal => animal.name === newAnimal.name)) {
    return res.status(400).json({ error: 'Animal with this name already exists.' });
  }

  animals.push(newAnimal);
  res.json(animals);
});

router.delete('/:name', (req, res) => {
  const animalNameToRemove = req.params.name;

  animals = animals.filter(animal => animal.name !== animalNameToRemove);
  res.json(animals);
});

module.exports = router;
