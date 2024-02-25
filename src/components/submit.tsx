import React, { FC, HTMLProps } from 'react';
import { Button } from './button';

const SubmitComponent: FC<HTMLProps<HTMLDivElement>> = ({ children }) => (
  <div className="row justify-content-end">
    <div className="col-12 col-sm-8 col-md-6">
      <Button fullWidth type="submit">
        {children}
      </Button>
    </div>
  </div>
);

export default SubmitComponent;
