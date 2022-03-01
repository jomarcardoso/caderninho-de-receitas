import React, { FC, useMemo } from 'react';
import useAccount from '../../hooks/use-account';
import useFoods from '../../hooks/use-food';
import AccountContext from '../../contexts/account-context';
import FoodsContext from '../../contexts/foods-context';

const Contexts: FC = ({ children }) => {
  const foods = useFoods();
  const { account, setAccount } = useAccount(foods);
  const memoizedFoods = useMemo(() => foods, [foods]);
  const memoizedAccount = useMemo(
    () => ({ account, setAccount }),
    [account, setAccount],
  );

  return (
    <FoodsContext.Provider value={memoizedFoods}>
      <AccountContext.Provider value={memoizedAccount}>
        {children}
      </AccountContext.Provider>
    </FoodsContext.Provider>
  );
};

export default Contexts;
