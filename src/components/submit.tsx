import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from './button/button';

const SubmitComponent: FC = ({ children }) => (
  <Grid container justifyContent="flex-end">
    <Grid item xs={12} sm={8} md={6}>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {children}
      </Button>
    </Grid>
  </Grid>
);

export default SubmitComponent;
