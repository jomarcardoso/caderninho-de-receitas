import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Container from '../container/container';
import './section-card.scss';

interface Props {
  title?: string;
}

const SectionCard: FC<Props> = ({ title = '', children }) => {
  return (
    <div className="section-card">
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
    </div>
  );
};

export default SectionCard;
