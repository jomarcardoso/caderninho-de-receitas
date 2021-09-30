import React, { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Container from '../container/container';
import { primary } from '../page/page';

interface Props {
  title?: string;
}

const useStyles = makeStyles({
  root: {
    borderRadius: 2,
    overflow: 'hidden',
    border: `2px solid ${primary.main}`,
    backgroundColor: `${primary.main}`,
  },
  title: {
    color: 'white',
    padding: '4px 0',
    margin: 0,
    fontSize: 17,
  },
  body: {
    padding: 12,
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
