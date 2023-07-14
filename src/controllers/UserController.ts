import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

export const authentication = async (number: string, code: number, dbManager: any) => {
  try {
    const user = await dbManager.findOne('users', { phoneNumber: number });
    if (!user) {
      const token = jwt.sign(
        {
          id: code,
        },
        'asdkNJqw23Ni_wn23nsk',
        {
          expiresIn: '30d',
        }
      );
      const document = await dbManager.insertOne('users', { phoneNumber: number, token });
      // написать проверку если с базой что то пошло не так
      return { msg: `пользователь добавлен в бд ${document.phoneNumber} `, token: document.token };
    } else {
      return { msg: `авторизация с номером ${user.phoneNumber}`, token: user.token };
    }
  } catch (error) {
    console.log('authentication 39-line ', error);
  }
};
