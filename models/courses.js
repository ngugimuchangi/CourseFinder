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
    imgUrl: {
      type: String,
      required: true,
    },
    category: {
      type: SchemaTypes.ObjectId,
      ref: 'Categories',
    },
  },
  { timestamps: true },
);

const Course = model('Courses', courseSchema);
export default Course;
