import { Schema, SchemaTypes, model } from 'mongoose';

// Schema for course collection
const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      default: process.env.DEFAULT_IMAGE,
    },
    subcategory: String,
    category: {
      type: SchemaTypes.ObjectId,
      ref: 'Categories',
    },
  },
  { timestamps: true },
);

const Course = model('Courses', courseSchema);
export default Course;
