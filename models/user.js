import { Schema, SchemaTypes, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    topics: [
      {
        type: String,
        required: false,
      }],
    bookmarks: [
      {
        type: SchemaTypes.ObjectId,
        required: false,
        ref: 'Courses',
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
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
    timestamps: true,
  },
);
const User = model('Users', userSchema);
export default User;
