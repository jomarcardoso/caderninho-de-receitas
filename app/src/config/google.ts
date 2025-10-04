const FALLBACK_CLIENT_ID =
  '909303160702-r0lcfepjlhupmljhbadu9dvem7hcda2j.apps.googleusercontent.com';

export const GOOGLE_CLIENT_ID =
  process.env.GATSBY_GOOGLE_CLIENT_ID ?? FALLBACK_CLIENT_ID;
