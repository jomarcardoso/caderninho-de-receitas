import { type FC, type HTMLProps, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Form } from 'formik';
import type { FormikProps } from 'formik';
import type { Food } from 'services/food/food.model';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from 'services/language/language.service';
import { Field } from 'notebook-layout';
import SubmitComponent from '../submit';
import Image from '../image/image';
import { Button } from 'notebook-layout';
import { searchFoodIcons, type FoodIconSearchItem } from '../../services/icons.api';

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
  dietaryFiber: number | '';
  sugar: number | '';
  monounsaturatedFats: number | '';
  polyunsaturatedFats: number | '';
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
  alanine: number | '';
  arginine: number | '';
  asparticAcid: number | '';
  cystine: number | '';
  glutamicAcid: number | '';
  glutamine: number | '';
  glycine: number | '';
  proline: number | '';
  serine: number | '';
  tyrosine: number | '';
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
  const [iconQuery, setIconQuery] = useState('');
  const [iconLoading, setIconLoading] = useState(false);
  const [iconResults, setIconResults] = useState<FoodIconSearchItem[]>([]);

  useEffect(() => {
    const q = (values.icon || '').trim();
    setIconQuery(q);
  }, [values.icon]);

  useEffect(() => {
    let timer: any;
    const q = iconQuery;
    if (!q || q.length < 2) {
      setIconResults([]);
      return;
    }
    setIconLoading(true);
    timer = setTimeout(async () => {
      const list = await searchFoodIcons(q, 12);
      setIconResults(list);
      setIconLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [iconQuery]);

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
          {/* Preview do ícone selecionado (ou atual) */}
          {(() => {
            const selected = iconResults.find((it) => it.name === values.icon);
            if (selected && selected.content) {
              const isSvg = (selected.mediaType || '').toLowerCase().includes('svg') || selected.content.trim().startsWith('<');
              const src = isSvg
                ? `data:image/svg+xml;utf8,${encodeURIComponent(selected.content)}`
                : `data:${selected.mediaType || 'image/png'};base64,${selected.content}`;
              return (
                <div style={{ marginTop: 8 }}>
                  <img src={src} alt="" width={28} height={28} style={{ objectFit: 'contain' }} />
                </div>
              );
            }
            return food?.icon ? (
              <div style={{ marginTop: 8 }}>
                <Image src={food.icon} alt="" transparent />
              </div>
            ) : null;
          })()}

          {/* Sugestões de ícones a partir da busca */}
          {iconLoading && <div style={{ opacity: 0.7, fontSize: 12 }}>buscando ícones...</div>}
          {!iconLoading && iconResults.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              {iconResults.map((it) => {
                const isSvg = (it.mediaType || '').toLowerCase().includes('svg') || (it.content || '').trim().startsWith('<');
                const src = isSvg
                  ? `data:image/svg+xml;utf8,${encodeURIComponent(it.content || '')}`
                  : `data:${it.mediaType || 'image/png'};base64,${it.content || ''}`;
                return (
                  <button
                    key={it.name}
                    type="button"
                    onClick={() => setFieldValue('icon', it.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 10px',
                      borderRadius: 8,
                      border: '1px solid #ddd',
                      background: '#fff',
                      cursor: 'pointer',
                    }}
                    title={it.name}
                  >
                    <img src={src} alt="" width={20} height={20} style={{ objectFit: 'contain' }} />
                    <span style={{ fontSize: 12 }}>{it.name}</span>
                  </button>
                );
              })}
            </div>
          )}
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
        {renderInput(translate('foodFormDietaryFiber', language), 'dietaryFiber')}
        {renderInput(translate('foodFormSugar', language), 'sugar')}
        {renderInput(translate('foodFormMonounsaturatedFats', language), 'monounsaturatedFats')}
        {renderInput(translate('foodFormPolyunsaturatedFats', language), 'polyunsaturatedFats')}

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
        {renderInput(translate('foodFormAlanine', language), 'alanine')}
        {renderInput(translate('foodFormArginine', language), 'arginine')}
        {renderInput(translate('foodFormAsparticAcid', language), 'asparticAcid')}
        {renderInput(translate('foodFormCystine', language), 'cystine')}
        {renderInput(translate('foodFormGlutamicAcid', language), 'glutamicAcid')}
        {renderInput(translate('foodFormGlutamine', language), 'glutamine')}
        {renderInput(translate('foodFormGlycine', language), 'glycine')}
        {renderInput(translate('foodFormProline', language), 'proline')}
        {renderInput(translate('foodFormSerine', language), 'serine')}
        {renderInput(translate('foodFormTyrosine', language), 'tyrosine')}

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
            {translate('sendForApproval', language) || 'Enviar para aprovação'}
          </SubmitComponent>
        </div>
      </div>
    </Form>
  );
};
