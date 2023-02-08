import React, { HTMLProps, FC } from 'react';

interface Props {
  containerProps?: HTMLProps<HTMLDivElement>;
}

export type MainProps = HTMLProps<HTMLDivElement> & Props;

const Main: FC<MainProps> = ({ children = '', containerProps, ...props }) => (
  <main {...props}>
    <div className="container" {...containerProps}>
      {children || ''}
    </div>
  </main>
);

export default Main;
