import { DataTypes, Model } from 'sequelize';
import { SearchServiceSettings, CalendarEvents } from '../../models/models';
import { isDeepStrictEqual } from 'util';
import { CalendarEvent } from './interfaces';
// import { UserDataSearchService } from './interfaces.js';
export const calendarHandler = {
  getCalendarDate: async (userId: string): Promise<CalendarEvent | null> => {
    try {
      // console.log()
      // date: { type: DataTypes.DATE },
      // event: {
      //   type: DataTypes.JSONB,
      //     defaultValue: {
      //     name: { type: DataTypes.STRING },
      //     service: { type: DataTypes.ARRAY(DataTypes.NUMBER) },
      //     start_time: { type: DataTypes.DATE },
      //     end_time: { type: DataTypes.DATE },
      //     notes: { type: DataTypes.STRING },
      //   }
      const searchServiceSettings: Model<any> | null = await SearchServiceSettings.findOne({
        where: { userId },
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt', 'id']
        }
      });
      return searchServiceSettings?.dataValues ?? null;
    } catch (err) {
      console.error('Произошла ошибка при обработке запроса: ', err);
      return null;
    }
  },
  saveDataCalendar: async (currentId: string, data: CalendarEvent): Promise<boolean> => {
    try {
      //! проверка на разхождение start_time и end_time на фронте!
      const dateEvent = new Date(`${data.date}`) || null; // 2024-01-14
      const start_time = new Date(`${data.start_time}`) || null; // 2024-01-15T02:39:19.625Z
      const end_time = new Date(`${data.end_time}`) || null; // 2024-01-15T02:39:19.625Z

      if (!dateEvent) return false;

      const events: Model<CalendarEvent>[] | null = await CalendarEvents.findAll({
        where: { userId: currentId, date: new Date(`${dateEvent}`) },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
      console.log('currentEvent ', events);
      // if (!events.length) {
      //   await CalendarEvents.create( {
      //     userId: currentId,
      //     date: dateEvent,
      //     name: data.name,
      //     service: data.service,
      //     start_time: start_time,
      //     end_time: end_time,
      //     phone_number: data.phone_number,
      //     notes: data.notes,
      //   });
      //   return true;
      // } else {
      // console.log('currentEvent ', currentEvent.dataValues);
      // console.log('data ', data);
      // console.log('start_time ', start_time);
      // const { userId, id, ...settingsObject } = existingSearchSettings?.dataValues;
      // if (!isDeepStrictEqual(data, settingsObject)) {
      //   Object.entries(data).forEach(([key, value]) => {
      //     existingSearchSettings.set(key as keyof CalendarEvent, value);
      //   });
      //   await existingSearchSettings.save();
      //   return true;
      // }
      return true;
      // }
    } catch (err) {
      console.error('Произошла ошибка при обработке запроса: ', err);
      return false;
    }
  },
};

