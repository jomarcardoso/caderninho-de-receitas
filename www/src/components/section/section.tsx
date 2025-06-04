import React, { FC, HTMLProps } from 'react';
import SectionTitle from '../section-title/section-title';

export interface SectionProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  onBgWhite?: boolean;
}

const Section: FC<SectionProps> = ({
  onBgWhite = false,
  title = '',
  children,
  ...props
}) => {
  return (
    <div className="grid columns-1 g-3" {...props}>
      {title && (
        <div>
          {onBgWhite ? (
            <h2 className="h2" style={{ textAlign: 'center' }}>
              {title}
            </h2>
          ) : (
            <SectionTitle>{title}</SectionTitle>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Section;
