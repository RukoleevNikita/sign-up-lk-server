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
import { UserModel, UserDocument } from '../modules/User.js';

class MongoDBManager {
  private readonly databaseUrl: string;
  private model: Model<UserDocument> | null;

  constructor(databaseUrl: string) {
    this.databaseUrl = databaseUrl;
    // this.model = model<DatabaseDocument>('users', new Schema({}));
    this.model = null;
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
      this.model = this.getModel(collectionName);
      return this.model ? await this.model.create(document) : undefined;
    } catch (error) {
      console.error('Error inserting document into MongoDB:', error);
    }
  }

  async findOne<T extends Document>(collectionName: string, query: object): Promise<T | null> {
    try {
      this.model = this.getModel(collectionName);
      return (await this.model?.findOne(query)) || null;
    } catch (error) {
      console.error('Error finding document in MongoDB:', error);
    }
    return null;
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

  // async deleteOne<T extends DatabaseDocument>(collectionName: string, query: object): Promise<number | undefined> {
  //   try {
  //     const Model = this.getModel(collectionName);
  //     const result: DeleteWriteOpResultObject['result'] = await Model.deleteOne(query);
  //     return result.n;
  //   } catch (error) {
  //     console.error('Error deleting document in MongoDB:', error);
  //   }
  // }

  private getModel(collectionName: string): Model<UserDocument> | null {
    switch (collectionName) {
      case 'users': // if (x === 'value1')
        return UserModel;
      default:
        return null;
    }
    // if (collectionName === 'users') {
    //   return this.userModel as Model<DatabaseDocument>;
    // }
    // return model<DatabaseDocument>(collectionName, new Schema({}));
  }
}

export default MongoDBManager;
