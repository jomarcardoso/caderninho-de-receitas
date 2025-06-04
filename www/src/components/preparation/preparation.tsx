import React, { FC } from 'react';
import Section, { SectionProps } from '../section/section';

export interface PreparationProps extends SectionProps {
  preparation: string;
  title?: string;
}

const Preparation: FC<PreparationProps> = ({
  title = 'Modo de preparo',
  preparation = '',
  ...props
}) => {
  if (!preparation) return null;

  const preparationList = preparation.split(/\n\s/);

  return (
    <Section title={title} onBgWhite {...props}>
      <div className="grid g-2 columns-1">
        {preparationList.map((preparationLine) => (
          <div key={preparationLine}>{preparationLine}</div>
        ))}
      </div>
    </Section>
  );
};

export default Preparation;
