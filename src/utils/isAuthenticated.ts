import MongoDBManager from '../service/databaseService.js';

export default (req: any, res: any, next: any) => {
  return next();
};

// Извлечение токена из заголовка или запроса
// const token = req.headers.authorization?.split(' ')[1];

// if (token) {
// Проверка и верификация токена
//   jwt.verify(token, 'your-secret-key', (error, decoded) => {
//     if (error) {
//       res.sendStatus(403);
//     } else {
// Поиск информации о сеансе в базе данных
//       Session.findOne({ userId: decoded.username, token })
//         .then((session) => {
//           if (session) {
// Аутентификация успешна, передача управления следующему обработчику
//             next();
//           } else {
//             res.sendStatus(403);
//           }
//         })
//         .catch((error) => {
//           console.error('Error retrieving session:', error);
//           res.sendStatus(500);
//         });
//     }
//   });
// } else {
//   res.sendStatus(401);
// }
