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
import { translate } from '../../services/language/language.service';

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
            {translate('logout', language)}
          </button>
        )}
      </>
    );
  }, [user, logout, language]);

  const memoUnlogged = useMemo(() => {
    return (
      <>
        <p className="mb-3">{translate('userNotLoggedMessage', language)}</p>

        <Button
          className="ms-auto"
          contrast="light"
          variant="secondary"
          onClick={login}
        >
          <IoLogInOutline />
          {translate('login', language)}
        </Button>
      </>
    );
  }, [language, login]);

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
      <section aria-label={translate('userAreaAria', language)} className={classes} {...props}>
        <Avatar src={user?.photoURL as string} />

        {user?.displayName ? memoLogged : memoUnlogged}
      </section>

      <section aria-label={translate('appSettingsAria', language)}>
        {user?.displayName && (
          <>
            <Chips
              full
              name="language"
              className="mt-3"
              legend={translate('language', language)}
            >
              <Chip
                value="en"
                checked={language === 'en'}
                onChange={handleLanguage}
              >
                {translate('english', language)}
              </Chip>
              <Chip
                value="pt"
                checked={language === 'pt'}
                onChange={handleLanguage}
              >
                {translate('portuguese', language)}
              </Chip>
            </Chips>

            <Chips full name="user-class" className="mt-3">
              <Chip>{translate('cookChip', language)}</Chip>
              <Chip>{translate('nutritionistChip', language)}</Chip>
            </Chips>
          </>
        )}
      </section>
    </>
  );
};
