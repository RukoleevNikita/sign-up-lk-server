import jwt from 'jsonwebtoken';
import 'dotenv/config';

// export default (code: number): string => {
//   return jwt.sign(
//     {
//       id: code,
//     },
//     `${process.env.JWT}`,
//     {
//       expiresIn: '30d',
//     }
//   );
// };
interface TokenPayload {
  id: string;
}
export const tokenController  = {
  create: (id: string): string => jwt.sign(
    {
      id: id,
    },
    `${process.env.JWT}`,
    {
      expiresIn: '30d',
    }
  ),
  verify: (token: string): TokenPayload | null => {
    try {
      const decoded = jwt.verify(token, `${process.env.JWT}`);
      return decoded as TokenPayload;
    } catch (error) {
      console.error('Ошибка при проверке токена:', error);
      return null;
    }
  }
};

/*

const jwt = require('jsonwebtoken');

// Ваш секретный ключ (должен быть храниться в безопасном месте)
const secretKey = 'ваш_секретный_ключ';

// Пример функции для создания JWT токена при входе пользователя
function createToken(userId) {
  const payload = {
    user_id: userId,
    exp: Math.floor(Date.now() / 1000) + 3600, // Время истечения токена (1 час)
  };

  const token = jwt.sign(payload, secretKey);
  return token;
}

// Пример функции для проверки и извлечения идентификатора пользователя из JWT токена
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.user_id;
  } catch (error) {
    console.error('Ошибка при проверке токена:', error);
    return null;
  }
}

// Пример использования функций
const userId = 12345;
const userToken = createToken(userId);
console.log('JWT токен при входе:', userToken);

const retrievedUserId = verifyToken(userToken);
if (retrievedUserId !== null) {
  console.log('Идентификатор пользователя из JWT токена:', retrievedUserId);
} else {
  console.log('JWT токен недействителен или истек.');
}

*/