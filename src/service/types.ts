import { Document, UpdateWriteOpResult } from 'mongoose';
export interface IMongoDBManager {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  insertOne<T extends Document>(collectionName: string, document: T): Promise<object | undefined>;
  findOne<T extends Document>(collectionName: string, query: object): Promise<T | null>;
  updateOne<T extends Document>(
    collectionName: string,
    query: object,
    update: object
  ): Promise<UpdateWriteOpResult | undefined>;
  deleteOne(collectionName: string, query: string): Promise<boolean | undefined>;
}