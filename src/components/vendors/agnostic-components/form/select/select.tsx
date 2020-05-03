import React from 'react';
import SelectCore from './select-core';
import FormConnector from '../use-form/form-connector';

function Select(props) {
  return (
    <FormConnector
      {...props}
      render={(connectorProps) => (
        <SelectCore render={props.render} {...connectorProps} />
      )}
    />
  );
}

export default Select;