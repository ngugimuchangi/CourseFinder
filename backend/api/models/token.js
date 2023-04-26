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
tokenSchema.index(
  { updatedAt: 1 },
  { expires: process.env.TOKEN_EXPIRY },
);
const Token = model('Tokens', tokenSchema);
export default Token;
