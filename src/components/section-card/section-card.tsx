import React, { FC } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Container from '../container/container';
import { primary } from '../page/page';

interface Props {
  title?: string;
}

const useStyles = makeStyles({
  root: {
    borderRadius: 2,
    overflow: 'hidden',
    border: `1px solid ${primary.main}`,
    backgroundColor: `${primary.main}`,
  },
  title: {
    color: 'white',
    padding: '8px 0',
    margin: 0,
    fontSize: 17,
  },
  body: {
    padding: '24px 12px',
    backgroundColor: 'white',
  },
});

const SectionCard: FC<Props> = ({ title = '', children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {title && (
        <Typography
          variant="h2"
          component="h3"
          align="left"
          className={classes.title}
        >
          <Container>{title}</Container>
        </Typography>
      )}
      <div className={classes.body}>{children}</div>
    </div>
  );
};

export default SectionCard;
