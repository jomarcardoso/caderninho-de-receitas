import { createContext } from 'react';

export interface HealthContextValue {
  serverUp: boolean;
  checking: boolean;
  lastChecked?: number;
  refresh: () => Promise<boolean>;
}

const HealthContext = createContext<HealthContextValue>({
  serverUp: true,
  checking: false,
  refresh: async () => true,
});

export default HealthContext;

