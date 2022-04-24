import React, { FC } from 'react';
import Grid, { GridProps } from '@mui/material/Grid';
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
            <h3 className="h2" style={{ textAlign: 'center' }}>
              {title}
            </h3>
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
