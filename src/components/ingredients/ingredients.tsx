import React, { FC, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Image from '../image';
import { PORTION, Portion } from '../../services/portion/portion.types';
import Section from '../section/section';
import ModalPortion from '../modal-portion/modal-portion';

interface Props {
  portions: Array<Portion>;
}

const Ingredients: FC<Props> = ({ portions = [] }) => {
  const [portionOnModal, setPortionOnModal] = useState<Portion>(PORTION);
  const [openedPortionModal, setOpenedPortionModal] = useState(false);

  function handleClickPortion(portion: Portion) {
    setPortionOnModal(portion);
    setOpenedPortionModal(true);
  }

  function handleClose() {
    setOpenedPortionModal(false);
  }

  return (
    <Section title="Ingredientes">
      <ModalPortion
        portion={portionOnModal}
        open={openedPortionModal}
        onClose={handleClose}
      />
      <List>
        {portions.map((portion) => (
          <ListItem
            button
            disableGutters
            key={portion.food.id}
            onClick={() => handleClickPortion(portion)}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2} sm={1}>
                <Box bgcolor="white" padding={1}>
                  <Image src={portion.food.image} alt={portion.food.name} />
                </Box>
              </Grid>
              <Grid item xs={10} sm={11}>
                <Typography>{portion.description}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Section>
  );
};

export default Ingredients;
