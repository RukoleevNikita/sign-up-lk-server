import { DataTypes } from 'sequelize';
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
// interface Event {
//   name: string,
//   service: number[];
//   start_time: DataTypes.DATE;
//   end_time: DataTypes.DATE;
//   notes: string;
// }
// export interface CalendarEvent {
//   id: number;
//   date: DataTypes.DATE;
//   event: Event;
// }

export interface CalendarEvent {
  id: DataTypes.UUID;
  date: DataTypes.DATE;
  name: string;
  service: number[];
  start_time: DataTypes.DATE;
  end_time: DataTypes.DATE;
  phone_number: string;
  notes: string;
}