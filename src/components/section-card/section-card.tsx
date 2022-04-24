import React, { FC } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Container from '@mui/material/Container';
import './section-card.scss';

interface Props {
  title?: string;
}

export type SectionCardProps = BoxProps & Props;

const SectionCard: FC<SectionCardProps> = ({ title = '', children }) => {
  return (
    <Box className="section-card" boxShadow={2}>
      {title && (
        <h3 className="section-card__title h2">
          <Container>{title}</Container>
        </h3>
      )}
      <div className="section-card__body">{children}</div>
    </Box>
  );
};

export default SectionCard;
