import { calendarHandler } from '../core/index';
import { Request, Response } from 'express';
import { CalendarEvent } from '../core/calendar/interfaces.js';
// import { UserDataSearchService } from '../core/searchServiceSettings/interfaces.js';

export const getCalendarData = async (req: Request, res: Response) => {
  try {
    // console.log('req.query ', req.query);
    // TODO добавить поле с ФИО клиента
    const data = [
      {
        id: 'asd_asd21231-2dsa',
        date: '2024-01-12T00:00:00+06:00',
        name: 'Мникюр',
        service: [0],
        start_time: '12:30',
        end_time: '13:30',
        phone_number: 'phone_number',
        notes: 'notes',
      },
      {
        id: 'asd_asd21231-2dsa',
        date: '2024-01-12T00:00:00+06:00',
        name: 'Педикюр',
        service: [1],
        start_time: '12:30',
        end_time: '13:30',
        phone_number: 'phone_number',
        notes: 'notes',
      },
      {
        id: 'asd_asd21231-2dsa',
        date: '2024-01-12T00:00:00+06:00',
        name: 'Мникюр',
        service: [0],
        start_time: '12:30',
        end_time: '13:30',
        phone_number: 'phone_number',
        notes: 'notes',
      },
      {
        id: 'asd_asd21231-2dsa',
        date: '2023-12-02T00:00:00+06:00',
        name: 'Маникюр',
        service: [1],
        start_time: '12:20',
        end_time: '13:10',
        phone_number: 'asd',
        notes: 'asd',
      },
      {
        id: 'asd_asd21231-2dsa',
        date: '2023-11-01T00:00:00+06:00',
        name: 'Педекюр',
        service: [0],
        start_time: '12:20',
        end_time: '13:10',
        phone_number: 'asd',
        notes: 'asd',
      }
    ];
    res.status(200).json({
      success: true,
      token: res.locals.token,
      data,
    });
    // const data: UserDataSearchService | null = await calendarHandler.getSettings(res.locals.id);
    // const calendarEvents: CalendarEvent[] | null = await calendarHandler.getCalendarDate(res.locals.id);
    // if (!data) {
    //   res.status(404).json({
    //     success: false,
    //     message: 'Документ не найден.',
    //   });
    // } else {
    //   res.status(200).json({
    //     success: true,
    //     token: res.locals.token,
    //     data,
    //   });
    // }
  } catch (error) {
    // console.error(error);
    // res.status(500).json({
    //   success: false,
    //   message: 'Внутренняя ошибка сервера.',
    // });
  }
};

export const saveSearchServiceSettings = async (req: Request, res: Response) => {
  try {
    // написать проерку на req.body иначе если нет в req.body {} все ровно придет true, надо отправить ответ на фронт что данных нет
    const resultSaving = await calendarHandler.saveDataCalendar(res.locals.id, req.body);
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

