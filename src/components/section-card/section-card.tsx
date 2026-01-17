import React, { FC, HTMLProps, useId } from 'react';
import './section-card.scss';

interface Props {
  title?: string;
}

export type SectionCardProps = HTMLProps<HTMLDivElement> & Props;

const SectionCard: FC<SectionCardProps> = ({
  title = '',
  children,
  ...props
}) => {
  const id = useId();

  return (
    <section aria-labelledby={id} className="section-card" {...props}>
      {title && (
        <strong className="section-card__title h2">
          <div className="container" id={id}>
            {title}
          </div>
        </strong>
      )}
      <div className="section-card__body">{children}</div>
    </section>
  );
};

export default SectionCard;
