// {
//   id: '64dd89340a7a3c2caba604d2',
//   userDataSearchService: {
//     activeAccount: true,
//     socialNetwork: [ 'instagram/link', 'vk/name' ],
//     workPhoneNumber: '89136553626',
//     firstName: 'Никита',
//     lastName: 'Руколеев',
//     userServices: [ [Object], [Object] ],
//     additionalServices: [ 'Аппаратный маникюр', 'Классический маникюр' ],
//     address: [ 'ТОК Флагман 4 этаж офис 422' ],
//     whatsapp: 'wa.me/79131465028',
//     telegram: 't.me/v_postnova_nails'
//   }
// }
export const getSearchServiceSettings = async (req: any, res: any, findOne: any) => {
  try {
    const searchServiceUserData = req.body;
    const userId = searchServiceUserData.userId;
    const doc = await findOne('searchservicesettings', { userId });

    if (!doc) {
      res.status(404).json({
        success: false,
        error: 'документ не найден',
      });
    } else {
      res.status(200).json({
        success: true,
        msg: doc,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

export const saveSearchServiceSettings = async (req: any, res: any, insertOne: any) => {
  try {
    const { userId, userDataSearchService } = req.body;

    const result = await insertOne('searchservicesettings', {
      userId,
      userDataSearchService,
    });

    if (result) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const updateSearchServiceSettings = async (req: any, res: any, updateOne: any, findOne: any) => {
  try {
    const updatedDoc = await updateOne('searchservicesettings', { userId: req.body.userId }, { $set: req.body });
    if (updatedDoc !== undefined) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'документ не был обновлен',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};
