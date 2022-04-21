import React, { FC } from 'react';
import Grid, { GridProps } from '@mui/material/Grid';
import { Button } from './button';

const SubmitComponent: FC<GridProps> = ({ children }) => (
  <Grid container justifyContent="flex-end">
    <Grid item xs={12} sm={8} md={6}>
      <Button fullWidth type="submit">
        {children}
      </Button>
    </Grid>
  </Grid>
);

export default SubmitComponent;
