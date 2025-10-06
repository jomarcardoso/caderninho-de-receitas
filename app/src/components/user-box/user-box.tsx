import {
  type FC,
  type HTMLProps,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  type CredentialResponse,
  useGoogleOneTapLogin,
} from '@react-oauth/google';
import { IoLogInOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { generateClasses } from '../../services/dom/classes';
import { Avatar } from '../avatar/avatar';
import { Button } from 'notebook-layout';
import './user-box.scss';
import { Chip, Chips } from '../chips/chips';
import { LanguageContext } from '../../providers/language/language.context';
import { type Language } from '../../services/language/language.types';
import { translate } from '../../services/language/language.service';
import { GOOGLE_CLIENT_ID } from '../../config/google';
import {
  authenticateWithGoogle,
  type GoogleLoginResponse,
} from '../../services/auth/auth.service';

export type UserBoxProps = Omit<HTMLProps<HTMLDivElement>, 'name'>;

const STORAGE_KEY = 'caderninho-de-receitas:google-user';

const getStoredUser = (): GoogleLoginResponse | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as GoogleLoginResponse;
  } catch (error) {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return null;
};

type PromptMomentNotification = {
  isDismissedMoment: () => boolean;
  getDismissedReason: () => string;
};

type GoogleAccountsIdNamespace = {
  initialize: (config: {
    client_id: string;
    callback: (credentialResponse: CredentialResponse) => void;
    auto_select?: boolean;
    context?: string;
    itp_support?: boolean;
    cancel_on_tap_outside?: boolean;
  }) => void;
  prompt: (
    callback: (notification: PromptMomentNotification) => void,
    options?: Record<string, unknown>,
  ) => void;
  cancel?: () => void;
};

const storeUser = (user: GoogleLoginResponse | null): void => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!user) {
    window.localStorage.removeItem(STORAGE_KEY);

    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const UserBox: FC<UserBoxProps> = ({ className = '', ...props }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [user, setUser] = useState<GoogleLoginResponse | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const existingUser = getStoredUser();

    if (existingUser) {
      setUser(existingUser);
    }
  }, []);

  const classes = useMemo(
    () =>
      generateClasses({
        'user-box': true,
        [className]: Boolean(className),
      }),
    [className],
  );

  const handleLogout = useCallback(() => {
    setUser(null);
    storeUser(null);
    setErrorMessage(null);
  }, []);

  const persistUser = useCallback((userInfo: GoogleLoginResponse) => {
    setUser(userInfo);
    storeUser(userInfo);
    setErrorMessage(null);
  }, []);

  const resolveLoginErrorMessage = useCallback(
    () =>
      language === 'pt'
        ? 'NÃ£o foi possÃ­vel conectar com o Google. Tente novamente mais tarde.'
        : 'Could not sign in with Google. Please try again later.',
    [language],
  );

  const authenticate = useCallback(
    async (token: string) => {
      if (!token || isAuthenticating) {
        return;
      }

      setIsAuthenticating(true);
      setErrorMessage(null);

      try {
        const response = await authenticateWithGoogle(token);
        persistUser(response);
      } catch (error) {
        console.error('Google authentication failed', error);
        setErrorMessage(resolveLoginErrorMessage());
        setUser(null);
        storeUser(null);
      } finally {
        setIsAuthenticating(false);
      }
    },
    [isAuthenticating, persistUser, resolveLoginErrorMessage],
  );

  const handleCredentialResponse = useCallback(
    (credentialResponse: CredentialResponse) => {
      if (user) {
        return;
      }

      const credential = credentialResponse.credential;

      if (!credential) {
        return;
      }

      void authenticate(credential);
    },
    [authenticate, user],
  );

  useGoogleOneTapLogin({
    onSuccess: handleCredentialResponse,
    onError: () => {
      console.error('Google one tap login failed');
    },
  });

  const login = useCallback(() => {
    if (isAuthenticating) {
      return;
    }

    setErrorMessage(null);

    if (typeof window === 'undefined') {
      setErrorMessage(resolveLoginErrorMessage());
      return;
    }

    const google = (
      window as {
        google?: {
          accounts?: {
            id?: GoogleAccountsIdNamespace;
          };
        };
      }
    ).google;

    const googleAccountsId = google?.accounts?.id;

    if (!googleAccountsId?.prompt || !googleAccountsId?.initialize) {
      setErrorMessage(resolveLoginErrorMessage());
      return;
    }

    googleAccountsId.cancel?.();

    googleAccountsId.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      context: 'signin',
      itp_support: true,
      cancel_on_tap_outside: false,
    });

    const promptOnce = (useFedCm: boolean) => {
      const options = useFedCm
        ? undefined
        : ({ use_fedcm_for_prompt: false } as Record<string, unknown>);

      googleAccountsId.prompt((notification: PromptMomentNotification) => {
        if (!notification.isDismissedMoment()) {
          return;
        }

        const reason = notification.getDismissedReason();

        if (useFedCm && reason !== 'credential_returned') {
          promptOnce(false);
          return;
        }

        if (reason !== 'credential_returned') {
          setErrorMessage(resolveLoginErrorMessage());
        }
      }, options);
    };

    promptOnce(true);
  }, [handleCredentialResponse, isAuthenticating, resolveLoginErrorMessage]);
  const memoLogged = useMemo(() => {
    return (
      <>
        <p>
          <strong>{user?.displayName}</strong>
        </p>
        {user?.displayName && (
          <button className="action-button" onClick={handleLogout}>
            <span className="svg-icon">
              <IoCloseCircleOutline />
            </span>
            {translate('logout', language)}
          </button>
        )}
      </>
    );
  }, [handleLogout, language, user?.displayName]);

  const memoUnlogged = useMemo(() => {
    return (
      <>
        <p className="mb-3">{translate('userNotLoggedMessage', language)}</p>
        {errorMessage && (
          <p className="text-danger" role="alert">
            {errorMessage}
          </p>
        )}

        <Button
          className="ms-auto"
          contrast="light"
          variant="secondary"
          onClick={login}
          disabled={isAuthenticating}
          aria-busy={isAuthenticating}
        >
          <IoLogInOutline />
          {translate('login', language)}
        </Button>
      </>
    );
  }, [errorMessage, isAuthenticating, language, login]);

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
      <section
        aria-label={translate('userAreaAria', language)}
        className={classes}
        {...props}
      >
        <Avatar src={user?.picture} />

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
