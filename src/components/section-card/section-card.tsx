import React, { FC, HTMLProps } from 'react';
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
  return (
    <div className="section-card" {...props}>
      {title && (
        <h3 className="section-card__title h2">
          <div className="container">{title}</div>
        </h3>
      )}
      <div className="section-card__body">{children}</div>
    </div>
  );
};

export default SectionCard;
