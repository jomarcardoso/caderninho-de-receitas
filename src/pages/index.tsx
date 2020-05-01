import React, { useState, useContext } from 'react';
import Quiz from '../components/quiz';
import { Link } from 'gatsby-theme-material-ui';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Layout from '../components/layout';
import Advertise from '../components/advertise';
import AccountContext from '../components/account-context';
import { Account } from '../services/account.service';

function Index() {
  const {
    account,
    setAccount,
  }: {
    account: Account;
    setAccount: string;
  } = useContext(AccountContext);
  const [readAdvertise, setReadAdvertise] = useState(false);
  const rendered = typeof window !== 'undefined';
  console.log(account);
  const registeredUser = Object.keys(account.user).length;

  if (rendered && !registeredUser) {
    if (!readAdvertise) {
      return (
        <Layout showFooter={false} showHeader={false}>
          <Advertise />
          <Typography>
            <Button onClick={() => setReadAdvertise(true)}>Avançar</Button>
          </Typography>
        </Layout>
      );
    }

    return (
      <Layout showFooter={false} showHeader={false}>
        <Quiz setUser={setAccount.user} />
        <Typography>
          <Link to="/menu">Tudo pronto</Link>
        </Typography>
      </Layout>
    );
  }

  return <Layout pageName="Menu" />;
}

export default Index;
