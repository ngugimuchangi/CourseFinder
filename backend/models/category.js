import { Schema, model } from 'mongoose';

// Categories schema
const categorySchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);

const Category = model('Categories', categorySchema);
export default Category;
