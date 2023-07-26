import { CookieOptions } from 'express';

export const cookieOptions: CookieOptions = {
  maxAge: 3600000,
  httpOnly: true,
  secure: false,
  sameSite: 'strict',
};
