import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Section, { SectionProps } from '../section/section';

interface Props {
  preparation: string;
}

export type PreparationProps = Props & SectionProps;

const Preparation: FC<PreparationProps> = ({ preparation = '', ...props }) => {
  if (!preparation) return <></>;

  const preparationList = preparation.split(/\n\s/);

  return (
    <Section title="Modo de preparo" onBgWhite {...props}>
      <Grid container spacing={1}>
        {preparationList.map((preparationLine) => (
          <Grid item xs={12} key={preparationLine}>
            <Typography>{preparationLine}</Typography>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default Preparation;
