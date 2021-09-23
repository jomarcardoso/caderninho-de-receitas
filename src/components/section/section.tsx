import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import SectionTitle from '../section-title/section-title';

interface Props {
  title?: string;
}

const Section: FC<Props> = ({ title = '', children }) => {
  return (
    <Grid container spacing={3}>
      {title && (
        <Grid item xs={12}>
          <SectionTitle>{title}</SectionTitle>
        </Grid>
      )}
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Section;
