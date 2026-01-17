import React, { FC, HTMLProps } from 'react';

interface Props {
  opaque?: boolean;
}

export type SectionTitleProps = Props & HTMLProps<HTMLHeadingElement>;

const SectionTitle: FC<SectionTitleProps> = ({
  opaque = false,
  children = '',
  ...props
}) => {
  return (
    <h3
      className={`h2 section-title ${opaque ? 'section-title--opaque' : ''}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export default SectionTitle;
