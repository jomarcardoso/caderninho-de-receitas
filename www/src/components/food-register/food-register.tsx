import React, { FC } from 'react';
import { FOOD, Food } from '../../services/food';
import { Formik, FormikProps } from 'formik';
import { FoodRegisterForm } from './food-register-form';

export interface FoodRegisterProps {
  food: Food;
}

export const FoodRegister: FC<FoodRegisterProps> = ({ food = FOOD }) => {
  return (
    <Formik
      initialValues={food}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik: FormikProps<Food>) => (
        <FoodRegisterForm
          food={food}
          // onCancel={handleCancel}
          {...formik}
        />
      )}
    </Formik>
  );
};
