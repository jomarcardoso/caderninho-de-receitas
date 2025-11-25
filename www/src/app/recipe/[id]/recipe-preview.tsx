import type { FC } from 'react';
import type { Recipe } from '@common/services/recipe';
import { Image2 } from '@/components/image-2/image';

type RecipePreviewProps = {
  recipe: Recipe;
  cardRef?: (el: HTMLDivElement | null) => void;
};

export const RecipePreview: FC<RecipePreviewProps> = ({ recipe, cardRef }) => {
  return (
    <div id="share-card" ref={cardRef} className="theme-light">
      <Image2
        srcs={[...(recipe?.imgs ?? []), ...(recipe?.food?.imgs ?? [])]}
        alt=""
        aspectRatio={2}
        objectFitCompatible
      />

      <div className="p-4 pb-5">
        <div style={{ display: 'grid', gap: 8 }}>
          <strong className="h2 mt-3 text-center">{recipe.name}</strong>
          {/* {recipe.calories ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 10px',
                borderRadius: 999,
                background: '#ffe8d7',
                color: '#8a4b14',
                fontWeight: 700,
                fontSize: 13,
                width: 'fit-content',
              }}
            >
              {calories} kcal por porcao
            </div>
          ) : null} */}
        </div>

        <div
          style={{
            borderRadius: 12,
            border: '1px dashed #d0d0d0',
            background: '#fafafa',
            display: 'grid',
            placeItems: 'center',
            color: '#8a8a8a',
            fontSize: 13,
            textAlign: 'center',
            padding: '8px 12px',
          }}
          className="my-3"
        >
          Cole o sticker de link aqui
        </div>

        <p className="text-center">{recipe.description}</p>
      </div>
    </div>
  );
};
