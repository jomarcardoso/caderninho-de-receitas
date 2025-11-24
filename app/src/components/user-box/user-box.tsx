
import {
  type FC,
  type HTMLProps,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { type CredentialResponse, useGoogleOneTapLogin } from '@react-oauth/google';
import { IoCloseCircleOutline, IoLogInOutline } from 'react-icons/io5';
import { generateClasses } from 'services/dom/classes';
import { Avatar } from 'notebook-layout';
import { Button } from 'notebook-layout';
import './user-box.scss';
import { Chip, Chips } from 'notebook-layout';
import { LanguageContext } from '../../providers/language/language.context';
import { type Language } from 'services/language/language.types';
import { translate } from 'services/language/language.service';
import { GOOGLE_CLIENT_ID } from '../../config/google';
import { authenticateWithGoogle, type GoogleLoginResponse, type GoogleLoginSuccess } from 'services/auth/auth.service';
import { clearAuthToken, setAuthToken } from 'services/auth/token.storage';

export type UserBoxProps = Omit<HTMLProps<HTMLDivElement>, 'name'>;

const STORAGE_KEY = 'caderninho-de-receitas:google-user';

const getStoredUser = (): GoogleLoginResponse | null => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as GoogleLoginResponse; } catch { window.localStorage.removeItem(STORAGE_KEY); return null; }
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
  prompt: (callback: (notification: any) => void, options?: Record<string, unknown>) => void;
  cancel?: () => void;
};

const storeUser = (user: GoogleLoginResponse | null): void => {
  if (typeof window === 'undefined') return;
  if (!user) { window.localStorage.removeItem(STORAGE_KEY); return; }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const UserBox: FC<UserBoxProps> = ({ className = '', ...props }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [user, setUser] = useState<GoogleLoginResponse | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showGsiButton, setShowGsiButton] = useState(false);
  const gsiButtonRef = useRef<HTMLDivElement | null>(null);
  const [credentialReceived, setCredentialReceived] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const fallbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const existing = getStoredUser();
    if (existing) setUser(existing);
  }, []);

  const classes = useMemo(
    () => generateClasses({ 'user-box': true, [className]: Boolean(className) }),
    [className],
  );

  const handleLogout = useCallback(() => {
    clearAuthToken();
    setUser(null);
    storeUser(null);
    setErrorMessage(null);
    try { window.dispatchEvent(new Event('app:user:logout')); } catch {}
  }, []);

  const persistSession = useCallback((session: GoogleLoginSuccess) => {
    const { user: sessionUser, token } = session;
    setAuthToken(token);
    setUser(sessionUser);
    storeUser(sessionUser);
    setErrorMessage(null);
    try { window.dispatchEvent(new Event('app:user:login')); } catch {}
  }, []);

  const resolveLoginErrorMessage = useCallback(
    () => (language === 'pt'
      ? 'Não foi possível conectar com o Google. Tente novamente mais tarde.'
      : 'Could not sign in with Google. Please try again later.'),
    [language],
  );

  const authenticate = useCallback(async (token: string) => {
    if (!token || isAuthenticating) return;
    setIsAuthenticating(true);
    setErrorMessage(null);
    try {
      const response = await authenticateWithGoogle(token);
      persistSession(response);
    } catch (error) {
      console.error('Google authentication failed', error);
      setErrorMessage(resolveLoginErrorMessage());
      setUser(null);
      storeUser(null);
    } finally {
      setIsAuthenticating(false);
    }
  }, [isAuthenticating, persistSession, resolveLoginErrorMessage]);

  const handleCredentialResponse = useCallback((credentialResponse: CredentialResponse) => {
    setCredentialReceived(true);
    if (fallbackTimerRef.current) { try { clearTimeout(fallbackTimerRef.current); } catch {} ; fallbackTimerRef.current = null; }
    setShowGsiButton(false);
    if (user) return;
    const credential = credentialResponse.credential;
    if (!credential) return;
    void authenticate(credential);
  }, [authenticate, user]);

  useGoogleOneTapLogin({
    onSuccess: handleCredentialResponse,
    onError: () => { console.error('Google one tap login failed'); setShowGsiButton(true); },
  });

  const login = useCallback(() => {
    if (isAuthenticating) return;
    setErrorMessage(null);
    setShowGsiButton(false);
    setCredentialReceived(false);
    setLoginAttempted(true);
    if (fallbackTimerRef.current) { try { clearTimeout(fallbackTimerRef.current); } catch {} ; fallbackTimerRef.current = null; }

    if (typeof window === 'undefined') { setErrorMessage(resolveLoginErrorMessage()); return; }
    const google = (window as any).google;
    const googleAccountsId: GoogleAccountsIdNamespace | undefined = google?.accounts?.id;
    if (!googleAccountsId?.prompt || !googleAccountsId?.initialize) { setErrorMessage(resolveLoginErrorMessage()); setShowGsiButton(true); return; }

    googleAccountsId.cancel?.();
    googleAccountsId.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      context: 'signin',
      itp_support: true,
      cancel_on_tap_outside: false,
    });

    try {
      googleAccountsId.prompt(() => {}, { use_fedcm_for_prompt: true } as any);
    } catch {
      try { googleAccountsId.prompt(() => {}, { use_fedcm_for_prompt: false } as any); }
      catch { setErrorMessage(resolveLoginErrorMessage()); setShowGsiButton(true); }
    }
  }, [handleCredentialResponse, isAuthenticating, resolveLoginErrorMessage]);

  useEffect(() => {
    if (!loginAttempted) return;
    if (credentialReceived) return;
    const t = window.setTimeout(() => {
      if (!credentialReceived) {
        setShowGsiButton(true);
        setErrorMessage((prev) => prev ?? resolveLoginErrorMessage());
      }
    }, 4000);
    return () => { try { clearTimeout(t); } catch {} };
  }, [loginAttempted, credentialReceived, resolveLoginErrorMessage]);

  useEffect(() => {
    if (!showGsiButton) return;
    if (typeof window === 'undefined') return;
    const id = (window as any).google?.accounts?.id;
    if (!id || !gsiButtonRef.current) return;
    try {
      gsiButtonRef.current.innerHTML = '';
      id.renderButton(gsiButtonRef.current, { theme: 'outline', size: 'large', type: 'standard', logo_alignment: 'left', width: 280 });
    } catch (e) { console.error('Failed to render GSI button', e); }
  }, [showGsiButton]);

  const memoLogged = useMemo(() => (
    <>
      <p><strong>{user?.displayName}</strong></p>
      {user?.displayName && (
        <button className="action-button" onClick={handleLogout}>
          <span className="svg-icon"><IoCloseCircleOutline /></span>
          {translate('logout', language)}
        </button>
      )}
    </>
  ), [handleLogout, language, user?.displayName]);

  const memoUnlogged = useMemo(() => (
    <>
      <p className="mb-3">{translate('userNotLoggedMessage', language)}</p>
      {errorMessage && (<p className="text-danger" role="alert">{errorMessage}</p>)}
      {!showGsiButton && (
        <Button className="ms-auto" variant="secondary" onClick={login} disabled={isAuthenticating} aria-busy={isAuthenticating}>
          <IoLogInOutline />
          {translate('login', language)}
        </Button>
      )}
    </>
  ), [errorMessage, isAuthenticating, language, login, showGsiButton]);

  const handleLanguage = useCallback<React.FormEventHandler<HTMLInputElement>>((event) => {
    if (!event.currentTarget.checked) return;
    setLanguage?.(event.currentTarget.value as Language);
  }, [setLanguage]);

  return (
    <>
      <section aria-label={translate('userAreaAria', language)} className={classes} {...props}>
        <Avatar src={user?.picture} />
        {user?.displayName ? memoLogged : memoUnlogged}
        {showGsiButton && (<div className="google-login mt-2" ref={gsiButtonRef} aria-live="polite" />)}
      </section>

      <section aria-label={translate('appSettingsAria', language)}>
        {user?.displayName && (
          <>
            <Chips full name="language" className="mt-3" legend={translate('language', language)}>
              <Chip value="en" checked={language === 'en'} onChange={handleLanguage}>{translate('english', language)}</Chip>
              <Chip value="pt" checked={language === 'pt'} onChange={handleLanguage}>{translate('portuguese', language)}</Chip>
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
