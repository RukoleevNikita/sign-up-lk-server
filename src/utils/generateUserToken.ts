import jwt from 'jsonwebtoken';

export default (code: number): string => {
  return jwt.sign(
    {
      id: code,
    },
    'asdkNJqw23Ni_wn23nsk',
    {
      expiresIn: '30d',
    }
  );
};
