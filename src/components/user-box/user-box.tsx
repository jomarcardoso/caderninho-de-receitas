import React, { FC, HTMLProps, useContext } from 'react';
import { IoLogInOutline } from 'react-icons/io5';
import FirebaseContext from '../../contexts/firebase-context';
import { generateCSSClasses } from '../../services/dom/classes';
import { Avatar } from '../avatar/avatar';
import { Button } from '../button';
import './user-box.scss';

export type UserBoxProps = Omit<HTMLProps<HTMLDivElement>, 'name'>;

export const UserBox: FC<UserBoxProps> = ({ className = '', ...props }) => {
  const { user, logout, login } = useContext(FirebaseContext);

  const classes = generateCSSClasses({
    'user-box': true,
    [className]: className,
  });

  return (
    <section className={classes} {...props}>
      <Avatar src={user?.photoURL as string} />
      {user?.displayName}
      {user?.displayName && (
        <button className="link" onClick={logout}>
          sair
        </button>
      )}
      {!user?.displayName && (
        <div className="user-box__content">
          <p className="mb-16">
            Você não está conectado, é importante fazer login para nunca perder
            suas receitas.
          </p>

          <Button
            className="ml-auto"
            contrast="light"
            variant="secondary"
            onClick={login}
          >
            <IoLogInOutline />
            login
          </Button>
        </div>
      )}
    </section>
  );
};
