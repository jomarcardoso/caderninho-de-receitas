import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React, { FC, useCallback } from 'react';
import { Recipe } from '../../services/recipe';
import Image from '../image/image';

interface Props {
  recipe: Recipe;
  setCurrentRecipe: React.Dispatch<React.SetStateAction<Recipe>>;
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

const RecipeCardResumed: FC<Props> = ({ recipe, setCurrentRecipe }) => {
  const classes = useStyles();

  const memoizedHandleClickLink = useCallback(() => {
    setCurrentRecipe(recipe);
  }, [recipe, setCurrentRecipe]);

  return (
    <Card className={classes.card} onClick={memoizedHandleClickLink}>
      <CardActionArea>
        <CardMedia>
          <Image src={recipe.image} alt="" aspectRatio={1.25} />
        </CardMedia>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h3">
          {recipe.name}
        </Typography>
        <Typography className={classes.description}>
          {recipe.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCardResumed;
