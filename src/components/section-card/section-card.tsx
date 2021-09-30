import React, { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
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
    padding: 3,
    margin: 0,
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
          align="center"
          className={classes.title}
        >
          {title}
        </Typography>
      )}
      <div className={classes.body}>{children}</div>
    </div>
  );
};

export default SectionCard;
