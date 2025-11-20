import { Language } from '@/contexts/language';
import { Category } from '@common/services/common/common.model';
import { FC, HTMLProps } from 'react';
import { Image2 } from './image-2/image';
import 'notebook-layout/styles/components/category.scss';

export interface CategoriesProps extends HTMLProps<HTMLUListElement> {
  categories: Category[];
  buildHref?: (c: Category) => string;
}

export const Categories: FC<CategoriesProps> = ({
  categories = [],
  buildHref,
  className,
  ...props
}) => {
  const language: Language = 'pt';

  return (
    <ul
      {...props}
      className={className || 'd-flex flex-wrap gap-3 justify-content-center'}
    >
      {categories.map((c) => (
        <li key={c.key}>
          <a
            className="category"
            style={{ width: 100 }}
            href={
              typeof buildHref === 'function'
                ? buildHref(c)
                : `/search?categories=${encodeURIComponent(c.key)}`
            }
          >
            {c.img ? <Image2 src={c.img} alt="" /> : null}
            <span>{c.text[language]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};
