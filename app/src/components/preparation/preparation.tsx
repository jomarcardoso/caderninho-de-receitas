import { type FC, useContext } from 'react';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from 'services/language/language.service';
import { Section, type SectionProps } from 'notebook-layout';

export interface PreparationProps extends SectionProps {
  preparation: string;
  title?: string;
}

const Preparation: FC<PreparationProps> = ({
  title,
  preparation = '',
  ...props
}) => {
  if (!preparation) return null;

  const { language } = useContext(LanguageContext);
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

export default Preparation;

