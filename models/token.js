import { Schema, SchemaTypes, model } from 'mongoose';

const tokenSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'Users',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Token = model('Tokens', tokenSchema);
export default Token;
