import { Schema, SchemaTypes, model } from 'mongoose';

const subcategoriesSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'Categories',
    },
    keywords: [{
      type: String,
    }],
  },
  { timestamps: true },
);

const Subcategory = model('Subcategories', subcategoriesSchema);
export default Subcategory;
