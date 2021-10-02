import React, { FC } from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { primary } from '../page/page';

const useStyles = makeStyles({
  root: {
    color: 'white',
    borderRadius: 2,
    padding: 3,
    backgroundColor: `${primary.main}cf`,
  },
});

const SectionTitle: FC<TypographyProps<'h3'>> = ({
  children = '',
  ...props
}) => {
  const classes = useStyles();

  return (
    <Typography
      variant="h2"
      component="h3"
      align="center"
      className={classes.root}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default SectionTitle;
