import { Language } from '@/contexts/language';
import { Category } from '@common/services/common/common.model';
import { FC, HTMLProps } from 'react';
import { Image2 } from './image-2/image';

export interface CategoriesProps extends HTMLProps<HTMLUListElement> {
  categories: Category[];
}

export const Categories: FC<CategoriesProps> = ({
  categories = [],
  ...props
}) => {
  const language: Language = 'pt';

  return (
    <ul {...props} className="d-flex flex-wrap gap-3">
      {categories.map((c) => (
        <li className="category" key={c.key} style={{ width: 100 }}>
          <Image2 src={c.img} />
          {c.pluralText[language]}
        </li>
      ))}
    </ul>
  );
};
