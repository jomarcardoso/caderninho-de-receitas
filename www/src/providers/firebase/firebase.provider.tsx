import React, { FC, HTMLProps, useMemo } from 'react';
import { useFirebase } from './firebase.hook';
import { FirebaseContext } from './firebase.context';

export const FirebaseProvider: FC<HTMLProps<Element>> = ({ children }) => {
  const firebase = useFirebase();

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};
