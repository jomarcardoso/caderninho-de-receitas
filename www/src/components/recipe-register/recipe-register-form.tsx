'use client';
import { CiSquarePlus } from 'react-icons/ci';
import { FieldArray, type FormikProps } from 'formik';
import {
  type FC,
  useCallback,
  type ChangeEventHandler,
  Fragment,
  useEffect,
  useState,
} from 'react';
import './recipe-register.scss';
import { Button, Field, Chips, Chip } from 'notebook-layout';
import { RECIPE_STEP_DTO, type RecipeStepDto } from 'services/recipe-step';
import type { RecipeDto } from 'services/recipe/recipe.dto';
import { translate } from 'services/language/language.service';
import { generateId } from 'services/string.service';
import { Language } from '@/contexts/language';
import { Image2 } from '../image-2/image';
import ImageUploadField from '../image-upload-field/image-upload-field';
import CookSvg from '@/assets/storyset/cook.svg';
import PizzaSvg from '@/assets/storyset/pizza.svg';

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
  categories?: string[];
  additional: string;
  imgs: string[];
}

interface Props {
  recipe?: RecipeDto;
  onCancel: () => void;
}

const BULLET = '-';

export const RecipeRegister: FC<FormikProps<RecipeForm> & Props> = ({
  values,
  handleBlur: formikHandleBlur,
  handleChange,
  setFieldValue,
  recipe,
}) => {
  const language: Language = 'pt';
  const [categoryOptions, setCategoryOptions] = useState<
    Array<{ key: string; label: string }>
  >([]);
  const [categoryInput, setCategoryInput] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch('/api/Recipe/categories', {
          cache: 'no-store',
        });
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        const opts = list
          .map((c: any) => ({
            key: String(c?.key || ''),
            label: String(c?.text?.pt || c?.key || ''),
          }))
          .filter((o) => o.key);
        if (alive) setCategoryOptions(opts);
      } catch {
        if (alive) setCategoryOptions([]);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const handleCategoriesChange: React.FormEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const key = e.currentTarget.value;
    const checked = e.currentTarget.checked;
    const current = Array.isArray(values.categories) ? values.categories : [];
    const next = checked
      ? Array.from(new Set([...current, key]))
      : current.filter((k) => k !== key);
    setFieldValue('categories', next);
  };

  const slugify = (val: string) => {
    return val
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
  };

  const handleAddCategory = () => {
    const raw = categoryInput.trim();
    if (!raw) return;
    const slug = slugify(raw);
    if (!slug) return;
    const current = Array.isArray(values.categories) ? values.categories : [];
    const next = Array.from(new Set([...current, slug]));
    setFieldValue('categories', next);
    setCategoryInput('');
  };

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
                    { suffix },
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
                    <ImageUploadField
                      prefix="recipes"
                      imgs={values.imgs || []}
                      onChange={(imgs) =>
                        setFieldValue('imgs', imgs.slice(0, 1))
                      }
                      label="Imagem da receita"
                      uploadOptions={{ maxWidth: 1600, maxHeight: 1600, quality: 60 }}
                      allowMultiple={false}
                    />
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
                    <Chips
                      name="categories"
                      legend="categorias"
                      type="checkbox"
                      full
                    >
                      {categoryOptions.map((opt) => (
                        <Chip
                          key={opt.key}
                          value={opt.key}
                          checked={(() => {
                            const arr = Array.isArray(values.categories)
                              ? values.categories
                              : [];
                            for (const k of arr) {
                              if (typeof k !== 'string') continue;
                              const norm = k.trim();
                              if (!norm) continue;
                              if (norm.toLowerCase() === opt.key.toLowerCase())
                                return true;
                            }
                            return false;
                          })()}
                          onChange={handleCategoriesChange}
                        >
                          {opt.label}
                        </Chip>
                      ))}
                    </Chips>

                    <div style={{ marginTop: 12 }}>
                      <Field
                        label="Adicionar outra categoria"
                        name="categoryInput"
                        value={categoryInput}
                        onChange={(e: any) => setCategoryInput(e?.target?.value ?? '')}
                        onKeyDown={(e: any) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCategory();
                          }
                        }}
                        placeholder="Digite uma nova categoria"
                      />
                      <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleAddCategory}
                        >
                          adicionar categoria
                        </Button>
                        {Array.isArray(values.categories) && values.categories.length > 0 && (
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                            {values.categories.map((c) => (
                              <Chip
                                key={c}
                                checked
                                value={c}
                                onChange={() =>
                                  setFieldValue(
                                    'categories',
                                    (values.categories || []).filter((k) => k !== c),
                                  )
                                }
                              >
                                {c}
                              </Chip>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                        <CiSquarePlus />
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
  );
};
