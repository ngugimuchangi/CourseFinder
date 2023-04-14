import { Schema, SchemaTypes, model } from 'mongoose';
import bcrypt from 'bcrypt';

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
        this.password = bcrypt.hashSync(this.password, 8);
      },
      isValidPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
    },
  },
  { timestamps: true },
);
const User = model('Users', userSchema);
export default User;
