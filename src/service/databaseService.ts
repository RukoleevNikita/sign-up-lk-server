import {
  connect,
  set,
  disconnect,
  model,
  Model,
  Document,
  Schema,
  UpdateWriteOpResult,
  // DeleteWriteOpResultObject,
} from 'mongoose';
import {
  UserModel,
  UserDocument,
  SessionModel,
  SessionDocument,
  WidgetModel,
  SearchServiceSettingsModel,
} from '../models/index.js';
// import { getModel } from '../models/getModels.js';

class MongoDBManager {
  private readonly databaseUrl: string;
  // private model: Model<UserDocument | SessionDocument> | null;

  constructor(databaseUrl: string) {
    this.databaseUrl = databaseUrl;
    // this.model = model<DatabaseDocument>('users', new Schema({}));
    // this.model = null;
  }

  async connect(): Promise<void> {
    try {
      //   await connect(this.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
      await set('strictQuery', false);
      await connect(this.databaseUrl);
      console.log('Db is connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }

  async insertOne<T extends Document>(collectionName: string, document: T): Promise<object | undefined> {
    try {
      // const modelUse = getModel(collectionName);
      // return (await modelUse.create(document)) || undefined;
      switch (collectionName) {
        case 'users':
          return (await UserModel.create(document)) || undefined;
        case 'session':
          return (await SessionModel.create(document)) || undefined;
        case 'widgets':
          return (await WidgetModel.create(document)) || undefined;
        case 'searchservicesettings':
          return (await SearchServiceSettingsModel.create(document)) || undefined;
        default:
          return undefined;
      }
      // this.model = this.getModel(collectionName);
      // return this.model ? await this.model.create(document) : undefined;
    } catch (error) {
      console.error('Error inserting document into MongoDB:', error);
    }
  }

  async findOne<T extends Document>(collectionName: string, query: object): Promise<T | null> {
    try {
      // const modelUse = await getModel(collectionName);
      // if (modelUse) return modelUse.findOne(query);
      switch (collectionName) {
        case 'users':
          return (await UserModel.findOne(query)) || null;
        case 'session':
          return (await SessionModel.findOne(query)) || null;
        case 'widgets':
          return (await WidgetModel.findOne(query)) || null;
        case 'searchservicesettings':
          return (await SearchServiceSettingsModel.findOne(query)) || null;
        default:
          return null;
      }
      // this.model = this.getModel(collectionName);
      // return (await this.model?.findOne(query)) || null;
      // return null;
    } catch (error) {
      console.error('Error finding document in MongoDB:', error);
    }
    return null;
  }

  async updateOne<T extends Document>(
    collectionName: string,
    query: object,
    update: object
  ): Promise<UpdateWriteOpResult | undefined> {
    try {
      switch (collectionName) {
        case 'users':
          return (await UserModel.updateOne(query, update)) || undefined;
        case 'session':
          return (await SessionModel.updateOne(query, update)) || undefined;
        case 'widgets':
          return (await WidgetModel.updateOne(query, update)) || undefined;
        case 'searchservicesettings':
          return (await SearchServiceSettingsModel.updateOne(query, update)) || undefined;
        default:
          return undefined;
      }
    } catch (error) {
      console.error('Error updating document in MongoDB:', error);
    }
  }
  // async updateOne<T extends DatabaseDocument>(
  //   collectionName: string,
  //   query: object,
  //   update: object
  // ): Promise<number | undefined> {
  //   try {
  //     const Model = this.getModel(collectionName);
  //     const result: UpdateWriteOpResult = await Model.updateOne(query, update);
  //     return result.nModified;
  //   } catch (error) {
  //     console.error('Error updating document in MongoDB:', error);
  //   }
  // }

  async deleteOne(collectionName: string, query: string): Promise<boolean | undefined> {
    try {
      switch (collectionName) {
        case 'users':
          return (await UserModel.findOneAndDelete({ id: query })) ?? undefined;
        case 'session':
          return (await SessionModel.findOneAndDelete({ userId: query })) ?? undefined;
        default:
          return undefined;
      }
    } catch (error) {
      console.error('Error deleting document in MongoDB:', error);
    }
  }

  // async findById<T extends Document>(collectionName: string, query: string): Promise<T | null> {
  //   try {
  //     switch (collectionName) {
  //       case 'users':
  //         return (await UserModel.findById(query)) || null;
  //       case 'session':
  //         return (await SessionModel.findById(query)) || null;
  //       default:
  //         return null;
  //     }
  //   } catch (error) {
  //     console.error('Error finding document by ID in MongoDB:', error);
  //   }
  // }
}

// private async getModel<T extends Document>(collectionName: string): Promise<T | null> {
// console.log('collectionName ', collectionName);
// switch (collectionName) {
//   case 'users': // if (x === 'value1')
//     return await UserModel;
//   default:
//     return null;
// }
// }

export default MongoDBManager;
