import React, { FC, useMemo, useContext } from 'react';
import './logo.scss';
import { generateClasses } from '../../services/dom/classes';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from '../../services/language/language.service';

const Logo: FC<{ active?: boolean; contrast?: boolean }> = ({
  active = false,
  contrast = false,
}) => {
  const classes = useMemo(() => {
    return generateClasses({
      logo: true,
      '-active': active,
      'logo--contrast': contrast,
    });
  }, [active, contrast]);
  const { language } = useContext(LanguageContext);

  return (
    <strong className={classes}>
      <div className="logo__text-small">{translate('logoSmall', language)}</div>
      <div className="logo__text-large">{translate('logoLarge', language)}</div>
    </strong>
  );
};

export default Logo;
