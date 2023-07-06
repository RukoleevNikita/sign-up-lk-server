import {
  connect,
  //   disconnect,
  model,
  set,
  Model,
  Document,
  Schema,
  //   UpdateWriteOpResult,
  //   DeleteWriteOpResultObject,
} from 'mongoose';

interface DatabaseDocument extends Document {
  [key: string]: any;
}

class MongoDBManager {
  private readonly databaseUrl: string;
  private client: Model<DatabaseDocument> | null;

  constructor(databaseUrl: string) {
    this.databaseUrl = databaseUrl;
    this.client = null;
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

  //   async disconnect(): Promise<void> {
  //     try {
  //       await disconnect();
  //       console.log('Disconnected from MongoDB');
  //     } catch (error) {
  //       console.error('Error disconnecting from MongoDB:', error);
  //     }
  //   }

  //   async insertOne<T extends DatabaseDocument>(collectionName: string, document: T): Promise<string | undefined> {
  //     try {
  //       const Model = model<T>(collectionName, new Schema({}));
  //       const result = await Model.create(document);
  //       return result._id.toString();
  //     } catch (error) {
  //       console.error('Error inserting document into MongoDB:', error);
  //     }
  //   }

  async findOne<T extends DatabaseDocument>(collectionName: string, query: object): Promise<T | null> {
    try {
      const Model = model<T>(collectionName, new Schema({}));
      return await Model.findOne(query);
    } catch (error) {
      console.error('Error finding document in MongoDB:', error);
    }
    return null;
  }

  //   async updateOne<T extends DatabaseDocument>(collectionName: string, query: object, update: object): Promise<number | undefined> {
  //     try {
  //       const Model = model<T>(collectionName, new Schema({}));
  //       const result: UpdateWriteOpResult = await Model.updateOne(query, update);
  //       return result.nModified;
  //     } catch (error) {
  //       console.error('Error updating document in MongoDB:', error);
  //     }
  //   }

  //   async deleteOne<T extends DatabaseDocument>(collectionName: string, query: object): Promise<number | undefined> {
  //     try {
  //       const Model = model<T>(collectionName, new Schema({}));
  //       const result: DeleteWriteOpResultObject['result'] = await Model.deleteOne(query);
  //       return result.n;
  //     } catch (error) {
  //       console.error('Error deleting document in MongoDB:', error);
  //     }
  //   }
}

export default MongoDBManager;
