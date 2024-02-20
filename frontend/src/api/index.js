import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_APP_URL}/api/animals`;

const api = {
  getAllAnimals: () => axios.get(BASE_URL).then(response => response.data),
  addAnimal: (newAnimal) => axios.post(BASE_URL, {name: newAnimal}).then(response => response.data),
  removeAnimal: (name) => axios.delete(`${BASE_URL}/${name}`).then(response => response.data)
};

export default api;