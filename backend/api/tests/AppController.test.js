import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import { randomBytes } from 'crypto';
import Category from '../../models/category';
import Subcategory from '../../models/subcategory';
import Course from '../../models/course';
import app from '../server';

chai.use(chaiHttp);

const { expect, request } = chai;

describe('Status and stats endpoints tests', () => {
  let db;

  before(async () => {
    const randomString = () => randomBytes(16).toString('hex');
    const categoriesCreationPromises = [];
    const subcategoriesCreationPromises = [];
    const coursesCreationPromises = [];
    db = await mongoose.connect(process.env.DB_TEST_URI);
    for (let i = 0; i < 10; i += 1) {
      const category = new Category({ title: randomString() });
      const subcategory = new Subcategory({
        title: randomString(),
        category: category._id,
        keywords: [randomString(), randomString()],
      });
      const course = new Course({
        title: randomString(),
        description: randomString(),
        provider: randomString(),
        category: subcategory._id,
        url: randomString(),
        imageUrl: randomString(),
      });
      categoriesCreationPromises.push(category.save());
      subcategoriesCreationPromises.push(subcategory.save());
      coursesCreationPromises.push(course.save());
    }
    await Promise.all(categoriesCreationPromises);
    await Promise.all(subcategoriesCreationPromises);
    await Promise.all(coursesCreationPromises);
  });

  after(async () => {
    await db.connection.dropDatabase();
    mongoose.connection.close();
  });

  describe('GET /status', () => {
    it('should return db and redis status', (done) => {
      request(app)
        .get('/status')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.db).to.be.true;
          expect(res.body.redis).to.be.true;
          done();
        });
    });
  });

  describe('GET /stats', () => {
    it('should count of categories, subcategories, and courses', (done) => {
      request(app)
        .get('/stats')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.categories).to.equal(10);
          expect(res.body.subcategories).to.equal(10);
          expect(res.body.courses).to.equal(10);
          done();
        });
    });
  });
});
