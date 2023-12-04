import { DataTypes, Model } from 'sequelize';
import { SearchServiceSettings } from '../../models/models.js';
import { isDeepStrictEqual } from 'util';
import { CalendarEvent } from './interfaces.js';
// import { UserDataSearchService } from './interfaces.js';
export const calendarHandler = {
  getCalendarDate: async (userId: string): Promise<CalendarEvent | null> => {
    try {
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
      const existingSearchSettings: Model<CalendarEvent> | null = await SearchServiceSettings.findOne({
        where: { userId: currentId },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
      if (!existingSearchSettings) {
        await SearchServiceSettings.create( {
          userId: currentId,
          date: data.date,
          event: {
            name: data.event.name,
            service: [...data.event.service],
            start_time: data.event.start_time,
            end_time: data.event.end_time,
            notes: data.event.notes,
          }
        });
        return true;
      } else {
        // const { userId, id, ...settingsObject } = existingSearchSettings?.dataValues;
        // if (!isDeepStrictEqual(data, settingsObject)) {
        //   Object.entries(data).forEach(([key, value]) => {
        //     existingSearchSettings.set(key as keyof CalendarEvent, value);
        //   });
        //   await existingSearchSettings.save();
        //   return true;
        // }
        return true;
      }
    } catch (err) {
      console.error('Произошла ошибка при обработке запроса: ', err);
      return false;
    }
  },
};

