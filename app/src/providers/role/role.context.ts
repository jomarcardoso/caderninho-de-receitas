import { createContext } from 'react';

export interface RoleContextValue {
  roles: string[];
  canEditFood: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
}

export const RoleContext = createContext<RoleContextValue>({
  roles: [],
  canEditFood: false,
  loading: false,
  refresh: async () => {},
});

export default RoleContext;

