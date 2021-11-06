import React, { FC } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import './section-title.scss';

const SectionTitle: FC<TypographyProps<'h3'>> = ({
  children = '',
  ...props
}) => {
  return (
    <Typography
      variant="h2"
      component="h3"
      align="center"
      className="section-title"
      {...props}
    >
      {children}
    </Typography>
  );
};

export default SectionTitle;
