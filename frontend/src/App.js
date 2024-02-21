import React, { useState, useEffect } from 'react';
import api from './api';
import AnimalForm from './components/AnimalForm';
import AnimalList from './components/AnimalList';

const App = () => {
  const [animals, setAnimals] = useState([]);
  const [animalsFetched, setAnimalsFetched] = useState(false);

  const fetchAnimals = async () => {
    try {
      setAnimalsFetched(false);
      const animals = await api.getAllAnimals();
      setAnimals(animals);
    } catch (error) {
      console.error(error);
    } finally {
      setAnimalsFetched(true);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const onSubmit = async (data) => {
    try {
      setAnimalsFetched(false);
      const updatedAnimals = await api.addAnimal(data.newAnimalName);
      setAnimals(updatedAnimals);
    } catch (error) {
      console.error(error);
    } finally {
      setAnimalsFetched(true);
    }
  };

  const removeAnimal = async (name) => {
    try {
      setAnimalsFetched(false);
      const updatedAnimals = await api.removeAnimal(name);
      setAnimals(updatedAnimals);
    } catch (error) {
      console.error(error);
    } finally {
      setAnimalsFetched(true);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="container mx-auto flex flex-col items-center p-4 mt-40">
        <div className="flex flex-col w-1/2">
          <h1 className="text-3xl font-semibold mb-6">Farm Management</h1>
          <AnimalForm onSubmit={onSubmit} animals={animals} />
        </div>
        <AnimalList
          animals={animals}
          removeAnimal={removeAnimal}
          animalsFetched={animalsFetched}
        />
      </div>
    </div>
  );
};

export default App;
