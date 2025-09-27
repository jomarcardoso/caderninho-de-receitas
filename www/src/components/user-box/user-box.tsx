import React, { FC, HTMLProps, useCallback, useContext, useMemo } from 'react';
import { IoLogInOutline } from 'react-icons/io5';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { generateClasses } from '../../services/dom/classes';
import { Avatar } from '../avatar/avatar';
import { Button } from '../button';
import './user-box.scss';
import { Chip, Chips } from '../chips/chips';
import { LanguageContext } from '../../providers/language/language.context';
import { Language } from '../../services/language/language.types';
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';

export type UserBoxProps = Omit<HTMLProps<HTMLDivElement>, 'name'>;

export const UserBox: FC<UserBoxProps> = ({ className = '', ...props }) => {
  const { language, setLanguage } = useContext(LanguageContext);

  const classes = useMemo(
    () =>
      generateClasses({
        'user-box': true,
        [className]: className,
      }),
    [className],
  );

  const login = useCallback(() => {
    useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        const idToken = tokenResponse.credential || tokenResponse.id_token;

        // Envia o token para o backend
        await axios.post('https://localhost:5001/api/auth/google', {
          idToken,
        });
      },
      onError: (errorResponse) => console.log(errorResponse),
    });

    useGoogleOneTapLogin({
      onSuccess: (a) => {
        a.credential;
      },
    });
  }, []);

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
            {I18N_TEXT.logout[language]}
          </button>
        )}
      </>
    );
  }, [user, logout, language]);

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

  const handleLanguage = useCallback<React.FormEventHandler<HTMLInputElement>>(
    (event) => {
      if (!event.currentTarget.checked) {
        return;
      }

      setLanguage?.(event.currentTarget.value as Language);
    },
    [setLanguage],
  );

  return (
    <>
      <section aria-label="área do usuário" className={classes} {...props}>
        <Avatar src={user?.photoURL as string} />

        {user?.displayName ? memoLogged : memoUnlogged}
      </section>

      <section aria-label="configurações do aplicativo">
        {user?.displayName && (
          <>
            <Chips
              full
              name="language"
              className="mt-3"
              legend={I18N_TEXT.language[language]}
            >
              <Chip
                value="en"
                checked={language === 'en'}
                onChange={handleLanguage}
              >
                {I18N_TEXT.english[language]}
              </Chip>
              <Chip
                value="pt"
                checked={language === 'pt'}
                onChange={handleLanguage}
              >
                {I18N_TEXT.portuguese[language]}
              </Chip>
            </Chips>

            <Chips full name="user-class" className="mt-3">
              <Chip>cozinheiro</Chip>
              <Chip>nutricionista</Chip>
            </Chips>
          </>
        )}
      </section>
    </>
  );
};
