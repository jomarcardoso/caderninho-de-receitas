import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
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
