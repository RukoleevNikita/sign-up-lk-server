import { model, Schema, Document, Types } from 'mongoose';

interface Widget {
  widgetId: number;
  active: boolean;
  widgetName: string;
}

export interface WidgetDocument extends Document {
  userId: Types.ObjectId;
  widgets: Widget[];
}

const WidgetSchema: Schema<WidgetDocument> = new Schema<WidgetDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User',
  },
  widgets: [
    {
      widgetId: {
        type: Number,
        required: true,
      },
      active: {
        type: Boolean,
        required: true,
      },
      widgetName: {
        type: String,
        required: true,
      },
    },
  ],
});

export const WidgetModel = model<WidgetDocument>('widgets', WidgetSchema);
