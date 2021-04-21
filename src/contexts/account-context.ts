import { createContext } from 'react';
import { AccountAndSet, ACCOUNT } from '../services/account.service';

const AccountContext = createContext<AccountAndSet>({ account: ACCOUNT });

export default AccountContext;
