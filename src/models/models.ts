import { DataTypes } from 'sequelize';
import { sequelize } from '../service/index';

const Users = sequelize.define(
  'users',
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    phoneNumber: { type: DataTypes.STRING, unique: true }
  }
);
const Widgets = sequelize.define(
  'widgets',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    widgets: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: []
    },
  }
);
const CalendarEvents = sequelize.define(
  'calendarEvents',
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    date: { type: DataTypes.DATE },
    name: { type: DataTypes.STRING },
    service: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
    start_time: { type: DataTypes.DATE },
    end_time: { type: DataTypes.DATE },
    phone_number: { type: DataTypes.TEXT },
    notes: { type: DataTypes.TEXT },
  }
);
const CalendarSettings = sequelize.define(
  'calendarSettings',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE },
  }
);
const Sessions = sequelize.define(
  'sessions',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    token: { type: DataTypes.TEXT },
  }
);
const SearchServiceSettings = sequelize.define(
  'searchServiceSettings',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    activeAccount: { type: DataTypes.BOOLEAN },
    socialNetwork: { type: DataTypes.ARRAY(DataTypes.TEXT) },
    workPhoneNumber: { type: DataTypes.TEXT, unique: true },
    firstName: { type: DataTypes.TEXT },
    lastName: { type: DataTypes.TEXT },
    userServices: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [
        { service: DataTypes.TEXT, price: DataTypes.TEXT },
        { service: DataTypes.TEXT, price: DataTypes.TEXT }
      ]
    },
    additionalServices: { type: DataTypes.ARRAY(DataTypes.TEXT) },
    address: { type: DataTypes.ARRAY(DataTypes.TEXT) },
    whatsapp: { type: DataTypes.TEXT },
    telegram: { type: DataTypes.TEXT },
    typeUser: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  }
);
const ImageGallery = sequelize.define(
  'imageGallery',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    previewImages: { type: DataTypes.ARRAY(DataTypes.STRING) },
    mainImages: { type: DataTypes.ARRAY(DataTypes.STRING) },
  }
);

Users.hasMany(Widgets);
Widgets.belongsTo(Users);

Users.hasMany(CalendarEvents);
CalendarEvents.belongsTo(Users);

Users.hasOne(CalendarSettings);
CalendarSettings.belongsTo(Users);

Users.hasOne(Sessions);
Sessions.belongsTo(Users);

Users.hasOne(SearchServiceSettings);
SearchServiceSettings.belongsTo(Users);

SearchServiceSettings.hasOne(ImageGallery);
ImageGallery.belongsTo(SearchServiceSettings);

export {
  Users,
  Widgets,
  CalendarEvents,
  CalendarSettings,
  Sessions,
  SearchServiceSettings,
  ImageGallery
};