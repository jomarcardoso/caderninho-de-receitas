import { type FC } from 'react';
import { Formik, FormikProps } from 'formik';
import { FoodRegisterForm } from './food-register-form';
import type { Food } from 'services/food/food.model';

export interface FoodRegisterProps {
  food: Food;
}

export const FoodRegister: FC<FoodRegisterProps> = ({ food }) => {
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

