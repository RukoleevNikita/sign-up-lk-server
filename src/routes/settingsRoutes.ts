import express from 'express';
import { searchServiceSettingsController } from '../controllers/index.js';
import { IMongoDBManager } from '../service/index.js';

const settingsRoutes = (dbManager: IMongoDBManager) => {
  const settingsRoutes = express.Router();

  settingsRoutes.get('/search-service', (req, res) =>
    searchServiceSettingsController.getSearchServiceSettings(req, res, dbManager.findOne)
  );
  settingsRoutes.post('/search-service', (req, res) =>
    searchServiceSettingsController.saveSearchServiceSettings(req, res, dbManager.insertOne)
  );
  settingsRoutes.put('/search-service', (req, res) =>
    searchServiceSettingsController.updateSearchServiceSettings(req, res, dbManager)
  );
  return settingsRoutes;
};

export default settingsRoutes;

// userId: Types.ObjectId;
// workPhoneNumber: string[]; // рабочий
// firstName?: string;
// lastName?: string;
// userServices?: object[]; объект с названием услоги и ценой [{service: 'Маникюр', price: 4000k}, {service: 'Визажист', price: 3000k}]
// additionalServices // дополнительный перечень услуг
// address?: string; // ТОК Флагман 4 этаж офис 422
// whatsapp?: string; // wa.me/79131465028
// telegram?: string; // ссылка на тг канал или аккаунт - t.me/v_postnova_nails
// activeAccount?: boolean;
// socialNetwork?: string[];
// фото примеров работ

// * searchServiceUserData:
// * activeAccount: true
// * socialNetwork: ["instagram/link", "vk/name"]
// * workPhoneNumber: "89136553626"
// * firstName: "Никита"
// * lastName: "Руколеев"
// * userServices: [{service: 'Маникюр', price: '4000k'}, {service: 'Визажист', price: '3000k'}]
// * additionalServices: ['Аппаратный маникюр', 'Классический маникюр']
// * address: ["ТОК Флагман 4 этаж офис 422"]
// * whatsapp: "wa.me/79131465028"
// * telegram: "t.me/v_postnova_nails"
