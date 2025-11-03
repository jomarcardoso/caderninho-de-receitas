import { type FC } from 'react';
import { Language } from '@/contexts/language';
import { translate } from '@common/services/language/language.service';
import { Section, type SectionProps } from 'notebook-layout';

export interface PreparationProps extends SectionProps {
  preparation: string;
  title?: string;
}

export const Preparation: FC<PreparationProps> = ({
  title,
  preparation = '',
  ...props
}) => {
  if (!preparation) return null;

  const language: Language = 'pt';
  const sectionTitle = title ?? translate('preparationTitle', language);
  const preparationList = preparation.split(/\n\s/);

  return (
    <Section title={sectionTitle} onBgWhite {...props}>
      <div className="grid g-2 columns-1">
        {preparationList.map((preparationLine) => (
          <div key={preparationLine}>{preparationLine}</div>
        ))}
      </div>
    </Section>
  );
};
