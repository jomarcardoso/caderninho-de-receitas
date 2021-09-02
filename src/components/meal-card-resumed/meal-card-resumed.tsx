import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React, { FC } from 'react';
import { Meal } from '../../services/meal';
import Image from '../image';

interface Props {
  meal: Meal;
  setCurrentRecipe: React.Dispatch<React.SetStateAction<Meal>>;
}

const useStyles = makeStyles({
  card: {
    height: '100%',
  },
  description: {
    lineClamp: 5,
    overflow: 'hidden',
    textOverflow: 'clip',
    boxOrient: 'vertical',
    maxHeight: 100,
  },
});

const MealCardResumed: FC<Props> = ({ meal, setCurrentRecipe }) => {
  const classes = useStyles();

  function handleClickLink() {
    setCurrentRecipe(meal);

    const elPage = document.querySelector('#root-content');

    elPage?.scrollTo({
      left: 9999,
      behavior: 'smooth',
    });
  }

  return (
    <Card className={classes.card} onClick={handleClickLink}>
      <CardActionArea>
        <CardMedia>
          <Image src={meal.image} alt="" aspectRatio={1.25} />
        </CardMedia>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h3">
          {meal.name}
        </Typography>
        <Typography className={classes.description}>
          {meal.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MealCardResumed;
