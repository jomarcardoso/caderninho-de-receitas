import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Section, { SectionProps } from '../section/section';

interface Props {
  preparation: string;
  title?: string;
}

export type PreparationProps = Props & SectionProps;

const Preparation: FC<PreparationProps> = ({
  title = 'Modo de preparo',
  preparation = '',
  ...props
}) => {
  if (!preparation) return null;

  const preparationList = preparation.split(/\n\s/);

  return (
    <Section title={title} onBgWhite {...props}>
      <Grid container spacing={1}>
        {preparationList.map((preparationLine) => (
          <Grid item xs={12} key={preparationLine}>
            {preparationLine}
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default Preparation;
