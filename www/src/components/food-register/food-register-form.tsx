'use client';
import {
  type FC,
  type HTMLProps,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Form } from 'formik';
import type { FormikProps } from 'formik';
import type { Food } from '@common/services/food/food.model';
import { LanguageContext } from '@/contexts/language/language.context';
import { translate } from '@common/services/language/language.service';
import { Field, Button } from 'notebook-layout';
import SubmitComponent from '@/components/submit/submit';
import { Image2 } from '@/components/image-2/image';
import {
  searchFoodIcons,
  type FoodIconSearchItem,
  getFoodIconsMapById,
  type FoodIconByIdEntry,
} from '@/services/icons.api';
import { CiTrash } from 'react-icons/ci';

export interface FoodRegisterFormProps {
  food: Food;
  onRequestDelete?: () => void;
  deleting?: boolean;
}

export interface FoodForm {
  namePt: string;
  nameEn: string;
  descriptionPt: string;
  descriptionEn: string;
  keysPt: string;
  keysEn: string;
  iconId?: number;
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

export const FoodRegisterForm: FC<
  FormikProps<FoodForm> & FoodRegisterFormProps
> = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  food,
  onRequestDelete,
  deleting = false,
}) => {
  const { language } = useContext(LanguageContext);
  const [imageLink, setImageLink] = useState('');
  const [iconQuery, setIconQuery] = useState('');
  const [iconLoading, setIconLoading] = useState(false);
  const [iconResults, setIconResults] = useState<FoodIconSearchItem[]>([]);
  const [iconByIdPreview, setIconByIdPreview] = useState<string>();

  useEffect(() => {
    const q = (values.icon || '').trim();
    setIconQuery(q);
  }, [values.icon]);

  useEffect(() => {
    const q = iconQuery;
    if (!q || q.length < 2) {
      setIconResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIconLoading(true);
      try {
        const list = await searchFoodIcons(q, 12);
        setIconResults(list);
      } finally {
        setIconLoading(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [iconQuery]);

  useEffect(() => {
    const id = (food as any)?.iconId as number | undefined;
    if (!id || id <= 0) {
      setIconByIdPreview(undefined);
      return;
    }
    let mounted = true;
    (async () => {
      try {
        const map = await getFoodIconsMapById([id]);
        const entry = map[id];
        if (!mounted) return;
        if (!entry) {
          setIconByIdPreview(undefined);
          return;
        }
        const media = (entry.mediaType || '').toLowerCase();
        const isSvg =
          media.includes('svg') || (entry.content || '').trim().startsWith('<');
        const src = isSvg
          ? `data:image/svg+xml;utf8,${encodeURIComponent(entry.content || '')}`
          : `data:${entry.mediaType || 'image/png'};base64,${
              entry.content || ''
            }`;
        setIconByIdPreview(src);
      } catch {
        if (mounted) setIconByIdPreview(undefined);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [food]);

  const renderInput = useCallback(
    (
      label = '',
      name: keyof FoodForm = 'namePt',
      breakline = false,
      multiline = false,
      type: HTMLProps<HTMLInputElement>['type'] = 'number',
    ) => (
      <Field
        multiline={multiline}
        breakline={breakline}
        label={label}
        name={name}
        value={(values as any)[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
      />
    ),
    [handleBlur, handleChange, values],
  );

  return (
    <Form className="pt-5" style={{ paddingBottom: 100 }}>
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div>
          <h3 className="h3">Links de imagens</h3>
          <div
            className="d-flex gap-3 align-items-center"
            style={{ flexWrap: 'wrap' }}
          >
            <div
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
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
            <div
              className="d-flex gap-3 align-items-center"
              style={{ flexWrap: 'wrap', marginTop: 12 }}
            >
              {values.imgs.map((url, i) => (
                <div
                  key={url + i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{ width: 120, borderRadius: 8, overflow: 'hidden' }}
                  >
                    <Image2 src={url} alt="" aspectRatio={1.25} />
                  </div>
                  <Button
                    variant="secondary"
                    contrast="light"
                    type="button"
                    onClick={() =>
                      setFieldValue(
                        'imgs',
                        values.imgs.filter((_, idx) => idx !== i),
                      )
                    }
                  >
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Field
            label="icon"
            name="icon"
            value={values.icon}
            onChange={handleChange}
            onBlur={handleBlur}
            breakline={false}
            type="text"
          />
          {(() => {
            const selected =
              iconResults.find(
                (it) => it.id && it.id === (values as any).iconId,
              ) || iconResults.find((it) => it.name === values.icon);
            if (selected && selected.content) {
              const isSvg =
                (selected.mediaType || '').toLowerCase().includes('svg') ||
                selected.content.trim().startsWith('<');
              const src = isSvg
                ? `data:image/svg+xml;utf8,${encodeURIComponent(
                    selected.content,
                  )}`
                : `data:${selected.mediaType || 'image/png'};base64,${
                    selected.content
                  }`;
              return (
                <div style={{ marginTop: 8 }}>
                  <img
                    src={src}
                    alt=""
                    width={28}
                    height={28}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              );
            }
            const srcs = [
              ...(iconByIdPreview ? [iconByIdPreview] : []),
              ...(((food as any)?.icon as string[]) ?? []),
            ];
            return srcs.length ? (
              <div style={{ marginTop: 8 }}>
                <Image2 srcs={srcs} alt="" transparent />
              </div>
            ) : null;
          })()}

          {iconLoading && (
            <div style={{ opacity: 0.7, fontSize: 12 }}>buscando icones...</div>
          )}
          {!iconLoading && iconResults.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                marginTop: 8,
              }}
            >
              {iconResults.map((it) => {
                const isSvg =
                  (it.mediaType || '').toLowerCase().includes('svg') ||
                  (it.content || '').trim().startsWith('<');
                const src = isSvg
                  ? `data:image/svg+xml;utf8,${encodeURIComponent(
                      it.content || '',
                    )}`
                  : `data:${it.mediaType || 'image/png'};base64,${
                      it.content || ''
                    }`;
                return (
                  <button
                    key={it.name}
                    type="button"
                    onClick={() => {
                      if (typeof it.id === 'number')
                        setFieldValue('iconId', it.id);
                      setFieldValue('icon', it.name);
                    }}
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
                    <img
                      src={src}
                      alt=""
                      width={20}
                      height={20}
                      style={{ objectFit: 'contain' }}
                    />
                    <span style={{ fontSize: 12 }}>{it.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <h3 className="h3" style={{ marginTop: 8 }}>
          Nome, descri��o e keys
        </h3>
        <div style={{ display: 'grid', gap: 8 }}>
          {renderInput('Nome (PT)', 'namePt', false, false, 'text')}
          {renderInput('Nome (EN)', 'nameEn', false, false, 'text')}
          {renderInput('Descri��o (PT)', 'descriptionPt', true, true)}
          {renderInput('Descri��o (EN)', 'descriptionEn', true, true)}
          {renderInput('Keys (PT)', 'keysPt', true, true)}
          {renderInput('Keys (EN)', 'keysEn', true, true)}
        </div>
        {renderInput(translate('foodFormGlycemicIndex', language), 'gi')}
        {renderInput(translate('foodFormCalories', language), 'calories')}
        {renderInput(
          translate('foodFormCarbohydrates', language),
          'carbohydrates',
        )}
        {renderInput(translate('foodFormProteins', language), 'proteins')}
        {renderInput(translate('foodFormTotalFat', language), 'totalFat')}
        {renderInput(
          translate('foodFormSaturatedFat', language),
          'saturedFats',
        )}
        {renderInput(
          translate('foodFormDietaryFiber', language),
          'dietaryFiber',
        )}
        {renderInput(translate('foodFormSugar', language), 'sugar')}
        {renderInput(
          translate('foodFormMonounsaturatedFats', language),
          'monounsaturatedFats',
        )}
        {renderInput(
          translate('foodFormPolyunsaturatedFats', language),
          'polyunsaturatedFats',
        )}

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
        {renderInput(
          translate('foodFormAsparticAcid', language),
          'asparticAcid',
        )}
        {renderInput(translate('foodFormCystine', language), 'cystine')}
        {renderInput(
          translate('foodFormGlutamicAcid', language),
          'glutamicAcid',
        )}
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
          <Button
            type="button"
            variant="secondary"
            onClick={onRequestDelete}
            disabled={deleting}
            style={{
              marginRight: 8,
              background: '#b22222',
              borderColor: '#b22222',
              color: '#fff',
            }}
          >
            <CiTrash className="svg-icon" />
            {deleting ? 'Enviando...' : 'Solicitar exclusão'}
          </Button>

          <SubmitComponent>
            {translate('sendForApproval', language) || 'Enviar para aprovacao'}
          </SubmitComponent>
        </div>
      </div>
    </Form>
  );
};
