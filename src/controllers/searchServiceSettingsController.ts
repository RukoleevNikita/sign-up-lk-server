export const getSearchServiceSettings = async (req: any, res: any, findOne: any) => {
  try {
    const user = await findOne('users', { id: req.body.id });
  } catch (error) {
    console.log(error);
  }
};

export const saveSearchServiceSettings = async (req: any, res: any, findOne: any) => {
  // сюда приходит userId
  // пользователь который в первый раз зарегался должен попсать по этому пути соответсвенно без данных, но второй раз уже с данными
  try {
    const user = await findOne('users', { id: req.body.id });
    if (!user) {
      res.status(404).json({
        success: false,
        msg: 'Пользователь не найден',
      });
    } else {
      res.status(200).json({
        success: true,
        msg: { id: user },
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const updateSearchServiceSettings = async (req: any, res: any, findOne: any) => {
  // сюда приходит userId
  // пользователь который в первый раз зарегался должен попсать по этому пути соответсвенно без данных, но второй раз уже с данными
  try {
    const user = await findOne('users', { id: req.body.id });
    if (!user) {
      res.status(404).json({
        success: false,
        msg: 'Пользователь не найден',
      });
    } else {
      res.status(200).json({
        success: true,
        msg: { id: user },
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
