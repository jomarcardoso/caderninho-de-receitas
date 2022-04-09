import React, { FC } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import './section-title.scss';

interface Props {
  opaque?: boolean;
}

export type SectionTitleProps = Props & TypographyProps<'h3'>;

const SectionTitle: FC<SectionTitleProps> = ({
  opaque = false,
  children = '',
  ...props
}) => {
  return (
    <Typography
      variant="h2"
      component="h3"
      align="center"
      className={`section-title ${opaque ? 'section-title--opaque' : ''}`}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default SectionTitle;
