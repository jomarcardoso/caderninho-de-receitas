import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React, { FC } from 'react';
import { Meal } from '../../services/meal';

interface Props {
  meal: Meal;
  setMealId(id: number): void;
  setEditingMeal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MealCardResumed: FC<Props> = ({ meal, setMealId, setEditingMeal }) => {
  function handleClickLink() {
    setMealId(meal.id);
    setEditingMeal(false);
  }

  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" image={meal.image} />
      </CardActionArea>
      <CardContent>
        <a href="#meal-panel" onClick={handleClickLink}>
          <Typography variant="h2">{meal.name}</Typography>
        </a>
      </CardContent>
    </Card>
  );
};

export default MealCardResumed;
