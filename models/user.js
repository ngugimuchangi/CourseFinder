import { Schema, SchemaTypes, model } from 'mongoose';
import { sha256 } from 'js-sha256';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    topics: [
      {
        type: SchemaTypes.ObjectId,
        required: false,
        ref: 'Subcategories',
      }],
    bookmarks: [
      {
        type: SchemaTypes.ObjectId,
        required: false,
        ref: 'Courses',
      }],
  },
  {
    methods: {
      hashPassword() {
        this.password = sha256(this.password);
      } 
    }
  },
  { timestamps: true },
);
const User = model('Users', userSchema);
export default User;
