import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SectionTitle from '../section-title/section-title';

interface Props {
  title?: string;
  onBgWhite?: boolean;
}

const Section: FC<Props> = ({ onBgWhite = false, title = '', children }) => {
  return (
    <Grid container spacing={3}>
      {title && (
        <Grid item xs={12}>
          {onBgWhite ? (
            <Typography variant="h2" component="h3" align="center">
              {title}
            </Typography>
          ) : (
            <SectionTitle>{title}</SectionTitle>
          )}
        </Grid>
      )}
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Section;
