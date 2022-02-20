import { createContext } from 'react';

const EditingContext = createContext<{
  editing: boolean;
  setEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}>({ editing: false });

export default EditingContext;
