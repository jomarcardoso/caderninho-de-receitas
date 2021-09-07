import React, { FC } from 'react';
import useAccount from '../../hooks/use-account';
import useFoods from '../../hooks/use-food';
import AccountContext from '../../contexts/account-context';
import FoodsContext from '../../contexts/foods-context';

const Contexts: FC = ({ children }) => {
  const foods = useFoods();
  const { account, setAccount } = useAccount(foods);

  return (
    <FoodsContext.Provider value={foods}>
      <AccountContext.Provider value={{ account, setAccount }}>
        {children}
      </AccountContext.Provider>
    </FoodsContext.Provider>
  );
};

export default Contexts;
