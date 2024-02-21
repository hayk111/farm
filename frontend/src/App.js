import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import clsx from 'clsx';
import api from './api';

const validationSchema = object({
  newAnimalName: string()
    .required('Animal name is required')
    .matches(/^[a-zA-Z]+$/, 'Animal name must contain only characters.'),
});

const App = () => {
  const { register, handleSubmit, reset, formState, watch } = useForm({
    resolver: async (data) => {
      try {
        await validationSchema.validate(data, { abortEarly: false });
        return { values: data, errors: {} };
      } catch (validationErrors) {
        return {
          values: {},
          errors: validationErrors.inner.reduce((acc, error) => {
            acc[error.path] = error.message;
            return acc;
          }, {}),
        };
      }
    },
  });

  const [animals, setAnimals] = useState([]);
  const [animalsFetched, setAnimalsFetched] = useState(false);

  const newAnimalName = watch('newAnimalName');
  const isAnimalExist = animals?.some(
    (animal) => animal.name?.toLowerCase() === newAnimalName?.toLowerCase()
  );

  useEffect(() => {
    api
      .getAllAnimals()
      .then((data) => setAnimals(data))
      .finally(() => setAnimalsFetched(true));
  }, []);

  const onSubmit = async (data) => {
    try {
      setAnimalsFetched(false);
      const updatedAnimals = await api.addAnimal(data.newAnimalName);
      setAnimals(updatedAnimals);
      reset();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 flex items-center">
              <input
                type="text"
                placeholder="Enter animal name"
                className="p-2 w-1/2 border border-gray-300"
                {...register('newAnimalName')}
              />
              <button
                type="submit"
                className={clsx('ml-2 bg-blue-500 text-white p-2', {
                  'disabled cursor-not-allowed opacity-50 focus:outline-none':
                    !formState.isValid || isAnimalExist,
                })}
                disabled={!formState.isValid || isAnimalExist}
              >
                Add Animal
              </button>
            </div>
            {formState.errors.newAnimalName && (
              <p className="text-sm text-red-500">
                {formState.errors.newAnimalName}
              </p>
            )}
            {isAnimalExist && (
              <p className="text-sm text-red-500">
                {newAnimalName?.toLowerCase()} already exists
              </p>
            )}
          </form>
        </div>

        <div className="w-1/2 mt-10">
          {!animalsFetched ? (
            <div className="flex justify-center w-full">
              <p className="text-gray-500 text-center animate-spin h-5 w-5">
                &#9696;
              </p>
            </div>
          ) : (
            <>
              {animals?.length === 0 && (
                <h2 className="text-gray-500 text-xl text-center">
                  No animals added yet.
                </h2>
              )}
              <ul>
                {animals?.map((animal) => (
                  <li
                    key={animal.name}
                    className="flex items-center justify-between border-b py-2"
                  >
                    <span>{animal.name}</span>
                    <button
                      onClick={() => removeAnimal(animal.name)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
