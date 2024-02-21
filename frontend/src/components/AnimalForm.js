import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import clsx from 'clsx';

const validationSchema = object({
  newAnimalName: string()
    .required('Animal name is required')
    .matches(/^[a-zA-Z]+$/, 'Animal name must contain only characters.'),
});

const AnimalForm = ({ onSubmit, animals }) => {
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

  const newAnimalName = watch('newAnimalName');
  const isAnimalExist = animals?.some(
    (animal) => animal.name?.toLowerCase() === newAnimalName?.toLowerCase()
  );

  const submitForm = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
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
        <p className="text-sm text-red-500">{formState.errors.newAnimalName}</p>
      )}
      {isAnimalExist && (
        <p className="text-sm text-red-500">
          {newAnimalName?.toLowerCase()} already exists
        </p>
      )}
    </form>
  );
};

AnimalForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
};

export default AnimalForm;
