import { type FC, type HTMLProps, useCallback, useContext, useState } from 'react';
import { Form } from 'formik';
import type { FormikProps } from 'formik';
import type { Food } from 'services/food/food.model';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from 'services/language/language.service';
import { Field } from 'notebook-layout';
import SubmitComponent from '../submit';
import Image from '../image/image';
import { Button } from 'notebook-layout';

export interface FoodRegisterFormProps { food: Food }

// Campos simples e achatados para ediço/salvamento
export interface FoodForm {
  name: string;
  description: string;
  icon: string;
  imgs: string[];
  gi: number | '';
  calories: number | '';
  carbohydrates: number | '';
  proteins: number | '';
  totalFat: number | '';
  saturedFats: number | '';
  // Amino acids (subset já presente no formulário antigo)
  tryptophan: number | '';
  phenylalanine: number | '';
  leucine: number | '';
  valine: number | '';
  isoleucine: number | '';
  lysine: number | '';
  threonine: number | '';
  methionine: number | '';
  histidine: number | '';
  // Minerals (conforme labels já existentes)
  calcium: number | '';
  copper: number | '';
  iron: number | '';
  manganese: number | '';
  magnesium: number | '';
  phosphorus: number | '';
  sodium: number | '';
  potassium: number | '';
  zinc: number | '';
  fluoride: number | '';
  selenium: number | '';
}

export const FoodRegisterForm: FC<FormikProps<FoodForm> & FoodRegisterFormProps> = ({ values, handleChange, handleBlur, setFieldValue, food }) => {
  const { language } = useContext(LanguageContext);
  const [imageLink, setImageLink] = useState('');

  const renderInput = useCallback(
    (
      label = '',
      name: keyof FoodForm = 'name',
      breakline = false,
      multiline = false,
      type: HTMLProps<HTMLInputElement>['type'] = 'number',
    ) => (
      <Field
        multiline={multiline}
        breakline={breakline}
        minRows={multiline ? 2 : undefined}
        label={label}
        name={name}
        value={(values as any)[name] as any}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
      />
    ),
    [handleBlur, handleChange, values],
  );

  return (
    <Form className='pt-5' style={{paddingBottom: 100}}>
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        {/* Imagem do alimento */}
        <div>
          <h3 className="h3">Links de imagens</h3>
          <div className="d-flex gap-3 align-items-center" style={{ flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <Field
                placeholder="colar link da imagem"
                name={'imageLinkDraft' as any}
                value={imageLink}
                onChange={(e: any) => setImageLink(e?.target?.value ?? '')}
                breakline={false}
                type="text"
              />
              <Button
                type="button"
                variant="secondary"
                contrast="light"
                onClick={() => {
                  const link = (imageLink || '').trim();
                  if (!link) return;
                  setFieldValue('imgs', [...(values.imgs || []), link]);
                  setImageLink('');
                }}
              >
                Adicionar link
              </Button>
            </div>
          </div>

          {!!values.imgs?.length && (
            <div className="d-flex gap-3 align-items-center" style={{ flexWrap: 'wrap', marginTop: 12 }}>
              {values.imgs.map((url, i) => (
                <div key={url + i} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                  <div style={{ width: 120, borderRadius: 8, overflow: 'hidden' }}>
                    <Image src={url} alt="" aspectRatio={1.25} />
                  </div>
                  <Button
                    variant="secondary"
                    contrast="light"
                    type="button"
                    onClick={() => setFieldValue('imgs', values.imgs.filter((_, idx) => idx !== i))}
                  >
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ícone (nome do arquivo) */}
        <div>
          <Field
            label={'icon'}
            name={'icon'}
            value={values.icon}
            onChange={handleChange}
            onBlur={handleBlur}
            breakline={false}
            type="text"
          />
          {/* Preview do ícone atual (resolvido do modelo) */}
          {food?.icon ? (
            <div style={{ marginTop: 8 }}>
              <Image src={food.icon} alt="" transparent />
            </div>
          ) : null}
        </div>

        {renderInput(translate('foodFormFoodName', language), 'name', false, false, 'text')}
        {renderInput(
          translate('descriptionLabel', language),
          'description',
          true,
          true,
        )}
        {renderInput(translate('foodFormGlycemicIndex', language), 'gi')}
        {renderInput(translate('foodFormCalories', language), 'calories')}
        {renderInput(
          translate('foodFormCarbohydrates', language),
          'carbohydrates',
        )}
        {renderInput(translate('foodFormProteins', language), 'proteins')}
        {renderInput(translate('foodFormTotalFat', language), 'totalFat')}
        {renderInput(translate('foodFormSaturatedFat', language), 'saturedFats')}

        {renderInput(translate('foodFormTryptophan', language), 'tryptophan')}
        {renderInput(
          translate('foodFormPhenylalanine', language),
          'phenylalanine',
        )}
        {renderInput(translate('foodFormLeucine', language), 'leucine')}
        {renderInput(translate('foodFormValine', language), 'valine')}
        {renderInput(translate('foodFormIsoleucine', language), 'isoleucine')}
        {renderInput(translate('foodFormLysine', language), 'lysine')}
        {renderInput(translate('foodFormThreonine', language), 'threonine')}
        {renderInput(translate('foodFormMethionine', language), 'methionine')}
        {renderInput(translate('foodFormHistidine', language), 'histidine')}

        {renderInput(translate('foodFormCalcium', language), 'calcium')}
        {renderInput(translate('foodFormCopper', language), 'copper')}
        {renderInput(translate('foodFormIron', language), 'iron')}
        {renderInput(translate('foodFormManganese', language), 'manganese')}
        {renderInput(translate('foodFormMagnesium', language), 'magnesium')}
        {renderInput(translate('foodFormPhosphorus', language), 'phosphorus')}
        {renderInput(translate('foodFormSodium', language), 'sodium')}
        {renderInput(translate('foodFormPotassium', language), 'potassium')}
        {renderInput(translate('foodFormZinc', language), 'zinc')}
        {renderInput(translate('foodFormFluoride', language), 'fluoride')}
        {renderInput(translate('foodFormSelenium', language), 'selenium')}

        <div style={{ marginTop: 12 }}>
          <SubmitComponent>
            {translate('save', language) || 'Salvar'}
          </SubmitComponent>
        </div>
      </div>
    </Form>
  );
};
