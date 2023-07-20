import generateUserToken from '../utils/generateUserToken.js';

export const authentication = async (number: string, code: number, findOne: any, insertOne: any, deleteOne: any) => {
  try {
    const user = await findOne('users', { phoneNumber: number });

    if (!user) {
      const token = generateUserToken(code);
      const document = await insertOne('users', { phoneNumber: number });
      document
        ? await insertOne('session', { userId: document._id.toString(), token: token })
        : console.error('пользователь не добавлен в БД');

      return document ? { id: document._id.toString(), token: token } : null;
    } else {
      const token = generateUserToken(code);
      await insertOne('session', { userId: user._id.toString(), token: token });

      return { id: user._id.toString(), token: token };
    }
  } catch (error) {
    console.log('authentication 39-line ', error);
  }
};

export const checkAuthorization = async (req: any, res: any, findOne: any) => {
  try {
    const session = await findOne('session', { userId: req.body.params.id });
    if (session === null) {
      res.status(404).json({
        success: false,
        msg: 'Пользователь не авторизован',
      });
    } else {
      res.status(200).json({
        succses: true,
        msg: { id: session.userId, token: session.token },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error,
    });
  }
};

export const deleteAuthorization = async (req: any, res: any, deleteOne: any) => {
  try {
    if ((await deleteOne('session', req.body.params.id)) === undefined) {
      res.status(404).json({
        succses: false,
        msg: 'Сессии с таким id не существует',
      });
    } else {
      res.status(200).json({
        succses: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error,
    });
  }
};
