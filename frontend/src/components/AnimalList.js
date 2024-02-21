import React from 'react';
import PropTypes from 'prop-types';

const AnimalList = ({ animals, removeAnimal, animalsFetched }) => {
  return (
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
  );
};

AnimalList.propTypes = {
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  removeAnimal: PropTypes.func.isRequired,
  animalsFetched: PropTypes.bool.isRequired,
};

export default AnimalList;
