import { Form, FieldArray, FormikProps } from 'formik';
import React, { FC, useCallback, ChangeEventHandler, useContext } from 'react';
import { IoDuplicateOutline } from 'react-icons/io5';
import Field from '../field/field';
import SubmitComponent from '../submit';
import './recipe-register.scss';
import { Button } from '../button';
import CookSvg from '../../assets/svg/history/cook.svg';
import PizzaSvg from '../../assets/svg/history/pizza.svg';
import { RecipeStepDto } from '../../services/recipe-step';
import { RecipeDto } from '../../services/recipe/recipe.dto';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from '../../services/language/language.service';

export interface RecipeForm {
  steps: RecipeDto['steps'];
  name: string;
  description: string;
  // category: RecipeCategory | '';
  quantitySteps: number;
  additional: string;
}

interface Props {
  recipe?: RecipeDto;
  onCancel: () => void;
}

const BULLET = '-';

const RecipeRegisterForm: FC<FormikProps<RecipeForm> & Props> = ({
  values,
  onCancel,
  handleBlur: formikHandleBlur,
  handleChange,
  setFieldValue,
  recipe,
}) => {
  const { language } = useContext(LanguageContext);

  const memoizedRenderInputIngredient = useCallback(
    (index = 0, ingredients = '', stepName = '') => {
      const normalizedIngredients = ingredients.trim();
      const ingredientList = normalizedIngredients
        ? normalizedIngredients.split('\n').map((line) => line.trim())
        : [];
      const bulletValue = ingredientList.length
        ? `${BULLET} ${ingredientList.join(`\n${BULLET} `)}`
        : '';
      const suffix = stepName ? ` - ${stepName}` : '';
      const label = translate('ingredientsLabelWithStep', language, { suffix });

      const handleChangeIngredient: ChangeEventHandler<HTMLTextAreaElement> = (
        event,
      ) => {
        const cleanedValue = event.target.value
          .split('\n')
          .map((line) => line.replace(new RegExp(`^${BULLET} ?`), '').trim())
          .filter((line) => line.length)
          .join('\n');

        setFieldValue(`steps.${index}.ingredients`, cleanedValue);
      };

      return (
        <Field
          multiline
          label={label}
          minRows="4"
          name={`steps.${index}.ingredient`}
          value={bulletValue}
          onChange={handleChangeIngredient}
          onBlur={formikHandleBlur}
        />
      );
    },
    [formikHandleBlur, language, setFieldValue],
  );

  const memoizedRenderSteps = useCallback(() => {
    const steps: RecipeStepDto[] = [];

    for (let i = 0; i < Number(values.quantitySteps); i += 1) {
      steps.push(values.steps[i]);
    }

    return (
      <>
        {steps.map((step = {} as RecipeStepDto, index) => {
          const suffix = step.title ? ` - ${step.title}` : '';

          return (
            <React.Fragment key={`${step.title ?? 'step'}-${index}`}>
              <div>
                <Field
                  label={translate('stepNameLabel', language, {
                    index: index + 1,
                  })}
                  name={`steps.${index}.name`}
                  value={step.title}
                  onChange={handleChange}
                  onBlur={formikHandleBlur}
                  hint={
                    <details>
                      <summary
                        dangerouslySetInnerHTML={{
                          __html: translate('stepHintSummary', language),
                        }}
                      />
                      <p>{translate('stepHintBody', language)}</p>
                    </details>
                  }
                />
              </div>

              <div>
                {memoizedRenderInputIngredient(
                  index,
                  step.ingredientsText,
                  step.title,
                )}
              </div>

              <div>
                <Field
                  multiline
                  minRows="4"
                  label={translate('preparationLabelWithStep', language, {
                    suffix,
                  })}
                  name={`steps.${index}.preparation`}
                  value={step.preparation}
                  onChange={handleChange}
                  onBlur={formikHandleBlur}
                />
              </div>

              <div>
                <Field
                  multiline
                  name={`steps.${index}.additional`}
                  label={translate('additionalInformationLabelWithStep', language, {
                    suffix,
                  })}
                  value={step.additional}
                  onChange={handleChange}
                  onBlur={formikHandleBlur}
                />
              </div>
            </React.Fragment>
          );
        })}
      </>
    );
  }, [
    formikHandleBlur,
    handleChange,
    language,
    memoizedRenderInputIngredient,
    values.quantitySteps,
    values.steps,
  ]);

  return (
    <Form action="/" method="post">
      <div className="recipe-register__body">
        <div className="recipe-register__wrapper">
          <FieldArray name="steps">
            {() => (
              <>
                {recipe?.id ? (
                  <div className="recipe-register__story-image">
                    <CookSvg style={{ mixBlendMode: 'multiply' }} />
                  </div>
                ) : (
                  <div className="container">
                    <PizzaSvg style={{ mixBlendMode: 'multiply' }} />
                  </div>
                )}
                <div className="container">
                  <div className="grid columns-1 g-6">
                    <div>
                      {!recipe?.id ? (
                        <p>{translate('creatingRecipeMessage', language)}</p>
                      ) : (
                        <p>{translate('editingRecipeMessage', language)}</p>
                      )}
                    </div>

                    <div>
                      <Field
                        label={translate('recipeNameLabel', language)}
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={formikHandleBlur}
                      />
                    </div>

                    <div>
                      <Field
                        multiline
                        name="description"
                        label={translate('descriptionLabel', language)}
                        value={values.description}
                        onChange={handleChange}
                        onBlur={formikHandleBlur}
                        minRows={2}
                      />
                    </div>

                    <div>
                      <Field
                        multiline
                        name="additional"
                        label={translate('additionalInformationLabel', language)}
                        value={values.additional}
                        onChange={handleChange}
                        onBlur={formikHandleBlur}
                        minRows={2}
                      />
                    </div>

                    {memoizedRenderSteps()}

                    <div>
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Button
                          type="button"
                          variant="secondary"
                          contrast="light"
                          onClick={() =>
                            setFieldValue(
                              'quantitySteps',
                              values.quantitySteps + 1,
                            )
                          }
                        >
                          <IoDuplicateOutline />
                          {translate('addAnotherStep', language)}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </FieldArray>
        </div>
      </div>
      <div className="recipe-register__submit">
        <div className="grid g-0">
          <div className="g-col-4">
            <Button fullWidth variant="secondary" onClick={onCancel}>
              {translate('cancel', language)}
            </Button>
          </div>

          <div className="g-col-8">
            <SubmitComponent>{translate('saveRecipe', language)}</SubmitComponent>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default RecipeRegisterForm;
