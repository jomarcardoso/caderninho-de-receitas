import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface Props {
  title?: string;
}

const Section: FC<Props> = ({ title = '', children }) => {
  return (
    <Grid container spacing={3}>
      {title && (
        <Grid item xs={12}>
          <Typography
            component="h2"
            variant="h1"
            color="primary"
            align="center"
          >
            {title}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Section;
