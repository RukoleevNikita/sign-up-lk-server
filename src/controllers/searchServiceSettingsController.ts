import { searchServiceSettingsHandler } from '../core/index';
import { Request, Response } from 'express';
import { UserDataSearchService } from '../core/searchServiceSettings/interfaces';

export const getSearchServiceSettings = async (req: Request, res: Response) => {
  try {
    const data: UserDataSearchService | null = await searchServiceSettingsHandler.getSettings(res.locals.id);
    if (!data) {
      res.status(404).json({
        success: false,
        message: 'Документ не найден.',
      });
    } else {
      res.status(200).json({
        success: true,
        token: res.locals.token,
        data,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера.',
    });
  }
};

export const saveSearchServiceSettings = async (req: Request, res: Response) => {
  try {
    // написать проерку на req.body иначе если нет в req.body {} все ровно придет true, надо отправить ответ на фронт что данных нет
    const resultSaving = await searchServiceSettingsHandler.saveSettings(res.locals.id, req.body);
    if (!resultSaving) {
      res.status(404).json({
        success: false,
        message: 'Произошла ошибка при обработке запроса.',
      });
    } else {
      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера.',
    });
  }
};

