import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
import UserModel from '../modules/User.js';
import MongoDBManager from './databaseController.js';

export const authentication = async (number: any, code: number) => {
  try {
    const dbManager = new MongoDBManager(
      `mongodb+srv://${process.env.USERNAME_MONGO}:${process.env.PASSWORD_MONGO}@cluster0.rahqltj.mongodb.net/`
    );
    await dbManager.connect();
    const registeredUser = await dbManager.findOne('users', { phoneNumber: number });

    // const registeredUser = await UserModel.findOne({
    //   phoneNumber: number,
    // });
    if (!registeredUser) {
      const token = jwt.sign(
        {
          id: code,
        },
        'asdkNJqw23Ni_wn23nsk',
        {
          expiresIn: '30d',
        }
      );
      const doc = new UserModel({
        phoneNumber: number,
        token,
      });
      const newUser = await doc.save();
      const { phoneNumber } = newUser;
      // написать проверку если с базой что то пошло не так
      return { msg: `пользователь добавлен в базу ${phoneNumber} `, token };
    } else {
      const user = await UserModel.findOne({
        phoneNumber: number,
      });
      if (!user) {
        return { msg: `что-то пошло не так 44-line`, success: false };
      }
      const { phoneNumber, token } = user;
      return { msg: `авторизация с номером ${phoneNumber}`, token: token };
    }
  } catch (error) {
    console.log('authentication 39-line ', error);
  }
};
