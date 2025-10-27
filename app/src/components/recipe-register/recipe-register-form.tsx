import { Form, FieldArray, type FormikProps } from 'formik';
import {
  type FC,
  useCallback,
  type ChangeEventHandler,
  useContext,
  Fragment,
} from 'react';
import { IoDuplicateOutline } from 'react-icons/io5';
import SubmitComponent from '../submit';
import './recipe-register.scss';
import { Button } from 'notebook-layout';
import HealthContext from '../../providers/health/health.context';
import CookSvg from 'images/svg/history/cook.svg?react';
import PizzaSvg from 'images/svg/history/pizza.svg?react';
import {
  RECIPE_STEP_DTO,
  type RecipeStepDto,
} from 'services/recipe-step';
import type { RecipeDto } from 'services/recipe/recipe.dto';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from 'services/language/language.service';
import { generateId } from 'services/string.service';
import { Field } from 'notebook-layout';
import UploadButton from '../upload-button/upload-button';
import Image from '../image/image';

interface RecipeStepDtoWithKeyId extends RecipeStepDto {
  keyId: string;
}

export const RECIPE_STEP_DTO_WITH_KEY_ID: RecipeStepDtoWithKeyId = {
  ...RECIPE_STEP_DTO,
  keyId: generateId(),
};

export interface RecipeForm {
  steps: RecipeStepDtoWithKeyId[];
  name: string;
  description: string;
  // category: RecipeCategory | '';
  // quantitySteps: number;
  additional: string;
  imgs: string[];
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
  const { serverUp } = useContext(HealthContext);

  const memoizedRenderInputIngredient = useCallback(
    (index = 0, ingredientsText = '', stepTitle = '') => {
      const normalizedIngredients = ingredientsText ?? '';
      const ingredientList = normalizedIngredients
        ? normalizedIngredients.split('\n')
        : [];
      const bulletValue = ingredientList.length
        ? `${BULLET} ${ingredientList.join(`\n${BULLET} `)}`
        : '';
      const suffix = stepTitle ? ` - ${stepTitle}` : '';
      const label = translate('ingredientsLabelWithStep', language, { suffix });

      const handleChangeIngredient: ChangeEventHandler<HTMLTextAreaElement> = (
        event,
      ) => {
        const cleanedValue = event.target.value
          .split('\n')
          // remove bullet prefix only, preserve user spaces
          .map((line) => line.replace(new RegExp(`^${BULLET} ?`), ''))
          .join('\n');

        setFieldValue(`steps.${index}.ingredientsText`, cleanedValue);
      };

      return (
        <Field
          multiline
          label={label}
          minRows="4"
          name={`steps.${index}.ingredientsText`}
          value={bulletValue}
          onChange={handleChangeIngredient}
          onBlur={formikHandleBlur}
        />
      );
    },
    [formikHandleBlur, language, setFieldValue],
  );

  const memoizedRenderSteps = useCallback(() => {
    return (
      <>
        {values.steps.map((step = RECIPE_STEP_DTO_WITH_KEY_ID, index) => {
          const suffix = step.title ? ` - ${step.title}` : '';

          return (
            <Fragment key={step.keyId}>
              <div>
                <Field
                  label={translate('stepNameLabel', language, {
                    index: index + 1,
                  })}
                  name={`steps.${index}.title`}
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
                  label={translate(
                    'additionalInformationLabelWithStep',
                    language,
                    {
                      suffix,
                    },
                  )}
                  value={step.additional}
                  onChange={handleChange}
                  onBlur={formikHandleBlur}
                />
              </div>
            </Fragment>
          );
        })}
      </>
    );
  }, [
    formikHandleBlur,
    handleChange,
    language,
    memoizedRenderInputIngredient,
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
                      <h3 className="h3">Imagem da receita</h3>
                      <div className="d-flex gap-3 align-items-center" style={{ flexWrap: 'wrap' }}>
                        <UploadButton
                          label={values.imgs?.length ? 'Substituir imagem' : 'Enviar imagem'}
                          prefix="recipes"
                          onUploaded={(url) => setFieldValue('imgs', [url])}
                        />
                      </div>
                      {!!values.imgs?.length && (
                        <div className="d-flex gap-3 align-items-center" style={{ flexWrap: 'wrap', marginTop: 8 }}>
                          <div style={{ width: 120, borderRadius: 8, overflow: 'hidden' }}>
                            <Image src={values.imgs[0]} alt="" aspectRatio={1.25} />
                          </div>
                          <Button variant="secondary" type="button" onClick={() => setFieldValue('imgs', [])}>
                            Remover imagem
                          </Button>
                        </div>
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
                        label={translate(
                          'additionalInformationLabel',
                          language,
                        )}
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
                          onClick={() =>
                            setFieldValue('steps', [
                              ...values.steps,
                              RECIPE_STEP_DTO_WITH_KEY_ID,
                            ])
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
      <div className="recipe-register__submit theme-base">
        <div className="grid g-0">
          <div className="g-col-4">
            <Button fullWidth variant="secondary" onClick={onCancel}>
              {translate('cancel', language)}
            </Button>
          </div>

          <div className="g-col-8">
            <SubmitComponent disabled={!serverUp} title={!serverUp ? 'Servidor offline' : undefined}>
              {translate('saveRecipe', language)}
            </SubmitComponent>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default RecipeRegisterForm;

