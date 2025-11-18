import { Language } from '@/contexts/language';
import { RecipeCategory } from '@common/services/common/common.model';
import { FC, HTMLProps } from 'react';

export interface CategoriesProps extends HTMLProps<HTMLUListElement> {
  categories: RecipeCategory[];
}

export const Categories: FC<CategoriesProps> = ({
  categories = [],
  ...props
}) => {
  const language: Language = 'pt';

  return (
    <ul {...props}>
      {categories.map((c) => (
        <li key={c.text[language]}>{c.pluralText[language]}</li>
      ))}
    </ul>
  );
};
