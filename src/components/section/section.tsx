import React, { FC } from 'react';
import Grid, { GridProps } from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SectionTitle from '../section-title/section-title';

interface Props {
  title?: string;
  onBgWhite?: boolean;
}

export type SectionProps = Props & GridProps;

const Section: FC<SectionProps> = ({
  onBgWhite = false,
  title = '',
  children,
}) => {
  return (
    <Grid container spacing={2}>
      {title && (
        <Grid item xs={12}>
          {onBgWhite ? (
            <Typography
              variant="h2"
              component="h3"
              align="center"
              color="secondary"
            >
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
