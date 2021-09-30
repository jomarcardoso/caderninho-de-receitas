import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Section from '../section/section';

interface Props {
  preparation: string;
}

const Preparation: FC<Props> = ({ preparation = '' }) => {
  if (!preparation) return <></>;

  return (
    <Section title="Modo de preparo" onBgWhite>
      <Grid container spacing={1}>
        {preparation.split(/\n\s/).map((preparationLine) => (
          <Grid item xs={12} key={preparationLine}>
            <Typography>{preparationLine}</Typography>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default Preparation;
