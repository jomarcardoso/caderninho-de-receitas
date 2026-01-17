import React, { FC, HTMLProps, useContext, useMemo } from 'react';
import { IoLogInOutline } from 'react-icons/io5';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { generateClasses } from '../../services/dom/classes';
import { Avatar } from '../avatar/avatar';
import { Button } from '../button';
import './user-box.scss';
import { Chip, Chips } from '../chips/chips';
import { FirebaseContext } from '../../providers';

export type UserBoxProps = Omit<HTMLProps<HTMLDivElement>, 'name'>;

export const UserBox: FC<UserBoxProps> = ({ className = '', ...props }) => {
  const { user, logout, login } = useContext(FirebaseContext);

  const classes = useMemo(
    () =>
      generateClasses({
        'user-box': true,
        [className]: className,
      }),
    [className],
  );

  const memoLogged = useMemo(() => {
    return (
      <>
        <p>
          <strong>{user?.displayName}</strong>
        </p>
        {user?.displayName && (
          <button className="action-button" onClick={logout}>
            <span className="svg-icon">
              <IoCloseCircleOutline />
            </span>
            sair
          </button>
        )}
      </>
    );
  }, [user, logout]);

  const memoUnlogged = useMemo(() => {
    return (
      <>
        <p className="mb-3">
          Você não está conectado, é importante fazer login para nunca perder
          suas receitas.
        </p>

        <Button
          className="ms-auto"
          contrast="light"
          variant="secondary"
          onClick={login}
        >
          <IoLogInOutline />
          login
        </Button>
      </>
    );
  }, []);

  return (
    <>
      <section aria-label="área do usuário" className={classes} {...props}>
        <Avatar src={user?.photoURL as string} />

        {user?.displayName ? memoLogged : memoUnlogged}
      </section>

      {user?.displayName && (
        <section aria-label="configurações do aplicativo" className="mt-3">
          <Chips full name="user-class">
            <Chip>cozinheiro</Chip>
            <Chip>nutricionista</Chip>
          </Chips>
        </section>
      )}
    </>
  );
};
