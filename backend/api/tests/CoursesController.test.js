import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { randomBytes } from 'crypto';
import Category from '../../models/category';
import Subcategory from '../../models/subcategory';
import Course from '../../models/course';
import app from '../server';

dotenv.config();
chai.use(chaiHttp);
const { expect, request } = chai;

describe('Courses endpoints tests', () => {
  let db;
  let testCourse;
  let subcategoryOne;
  let subcategoryTwo;
  const randomString = () => randomBytes(16).toString('hex');

  before(async () => {
    // DB connection
    db = await mongoose.connect(process.env.DB_TEST_URI);

    // Courses test data
    const category = new Category({ title: randomString() });
    subcategoryOne = new Subcategory({
      title: randomString(),
      category: category._id,
      keyword: [randomString(), randomString(), randomString()],
    });
    subcategoryTwo = new Subcategory({
      title: randomString(),
      category: category._id,
      keyword: [randomString(), randomString(), randomString()],
    });
    await category.save();
    await Promise.all([subcategoryOne.save(), subcategoryTwo.save()]);

    // Create test course data
    const courseCreationPromises = [];
    for (let i = 0; i < 15; i += 1) {
      const course = new Course({
        title: randomString(),
        description: randomString(),
        provider: randomString(),
        category: (i % 2) ? subcategoryOne._id : subcategoryTwo._id,
        url: randomString(),
        imageUrl: randomString(),
      });
      if (i === 14) testCourse = course;
      courseCreationPromises.push(course.save());
    }
    await Promise.all(courseCreationPromises);
  });

  after(async () => {
    await db.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('GET /courses', () => {
    it('should return list of courses without the category id and page number', (done) => {
      request(app)
        .get('/courses')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('Array').with.lengthOf(10);
          done();
        });
    });
    it('should return list of courses without the category id', (done) => {
      request(app)
        .get('/courses')
        .query({ page: 1 })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('Array').with.lengthOf(5);
          done();
        });
    });
    it('should return list of courses with categoryId and no page number', (done) => {
      request(app)
        .get('/courses')
        .query({ categoryId: subcategoryOne._id.toString() })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('Array').with.lengthOf(7);
          done();
        });
    });
    it('should return filtered list of courses for a different category id', (done) => {
      request(app)
        .get('/courses')
        .query({ categoryId: subcategoryTwo._id.toString() })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('Array').with.lengthOf(8);
          done();
        });
    });
    it('should return an empty list when page index is out of range', (done) => {
      request(app)
        .get('/courses')
        .query({ categoryId: subcategoryTwo._id.toString(), page: 1 })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('Array').with.lengthOf(0);
          done();
        });
    });
  });

  describe('GET /course:id', () => {
    it('should return course with given id', (done) => {
      request(app)
        .get(`/courses/${testCourse._id}`)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.id).to.equal(testCourse._id.toString());
          done();
        });
    });
    it('should return 400 error if course is not found', (done) => {
      request(app)
        .get(`/courses/${randomString()}`)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Not found');
          done();
        });
    });
  });
});
