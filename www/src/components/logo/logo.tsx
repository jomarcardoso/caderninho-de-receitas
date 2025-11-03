"use client";

import { type FC, useMemo, useContext } from 'react';
import './logo.scss';
import { generateClasses } from 'notebook-layout/utils/utils';
import { LanguageContext } from '@/contexts/language';
import { translate } from '@common/services/language/language.service';

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

