import { type FC, type HTMLProps, useMemo, useState } from 'react';
import { EditingContext } from './editing.context';

export const EditingProvider: FC<HTMLProps<Element>> = ({ children }) => {
  const [editing, setEditing] = useState(true);
  const memoizedEditing = useMemo(
    () => ({ editing, setEditing }),
    [editing, setEditing],
  );

  return (
    <EditingContext.Provider value={memoizedEditing}>
      {children}
    </EditingContext.Provider>
  );
};
