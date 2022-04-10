import React, { FC } from 'react';
import Grid, { GridProps } from '@mui/material/Grid';
import Button from './button/button';

const SubmitComponent: FC<GridProps> = ({ children }) => (
  <Grid container justifyContent="flex-end">
    <Grid item xs={12} sm={8} md={6}>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {children}
      </Button>
    </Grid>
  </Grid>
);

export default SubmitComponent;
