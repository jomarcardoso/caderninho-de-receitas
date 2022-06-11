import { User } from 'firebase/auth';
import React, { createContext } from 'react';

const UserContext = createContext<{
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
}>({});

export default UserContext;
