import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '../container/container';
import './section-card.scss';

interface Props {
  title?: string;
}

const SectionCard: FC<Props> = ({ title = '', children }) => {
  return (
    <Box className="section-card" boxShadow={2}>
      {title && (
        <Typography
          variant="h2"
          component="h3"
          align="left"
          className="section-card__title"
          color="white"
        >
          <Container>{title}</Container>
        </Typography>
      )}
      <div className="section-card__body">{children}</div>
    </Box>
  );
};

export default SectionCard;
