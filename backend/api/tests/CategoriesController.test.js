import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { randomBytes } from 'crypto';
import Category from '../../models/category';
import Subcategory from '../../models/subcategory';
import app from '../server';

dotenv.config();
chai.use(chaiHttp);
const { expect, request } = chai;

describe('Categories endpoints tests', () => {
  let db;
  let testCategory;
  let testSubcategory;
  const randomString = () => randomBytes(16).toString('hex');

  before(async () => {
    // DB connection
    db = await mongoose.connect(process.env.DB_TEST_URI);

    // Categories and subcategories tests data
    const categoriesCreationPromises = [];
    const subcategoriesCreationPromises = [];
    for (let i = 0; i < 10; i += 1) {
      const category = new Category({ title: randomString() });
      const subcategory = new Subcategory({
        title: randomString(),
        category: category._id,
        keywords: [randomString(), randomString()],
      });
      if (i === 9) {
        testCategory = category;
        testSubcategory = subcategory;
      }
      categoriesCreationPromises.push(category.save());
      subcategoriesCreationPromises.push(subcategory.save());
    }
    await Promise.all(categoriesCreationPromises);
    await Promise.all(subcategoriesCreationPromises);
  });

  after(async () => {
    await db.connection.dropDatabase();
    mongoose.connection.close();
  });

  describe('GET /categories', () => {
    it('should get list of all categories', (done) => {
      request(app)
        .get('/categories')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Array').with.lengthOf(10);
          done();
        });
    });
  });

  describe('GET /categories/:id', () => {
    it('should get category with given id', (done) => {
      request(app)
        .get(`/categories/${testCategory._id}`)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.id).to.equal(testCategory._id.toString());
          done();
        });
    });

    it('should return 404 if category is not found', (done) => {
      request(app)
        .get(`/categories/${randomString()}`)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Not found');
          done();
        });
    });
  });

  describe('GET /categories/:id/subcategories', () => {
    it('should return list of subcategories associated with a given category', (done) => {
      request(app)
        .get(`/categories/${testCategory._id}/subcategories`)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.count).to.equal(1);
          expect(res.body.subcategories).to.be.an('Array').with.lengthOf(1);
          done();
        });
    });
    it('should return an empty list of subcategories if such a category does not exists', (done) => {
      request(app)
        .get(`/categories/${randomString()}/subcategories`)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.count).to.equal(0);
          expect(res.body.subcategories).to.be.an('Array').with.lengthOf(0);
          done();
        });
    });
  });

  describe('GET /subcategories', () => {
    it('should return a list of all subcategories', (done) => {
      request(app)
        .get('/subcategories')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Array').with.lengthOf(10);
          done();
        });
    });
  });

  describe('GET /subcategories/:id', () => {
    it('should return a subcategories with given id', (done) => {
      request(app)
        .get(`/subcategories/${testSubcategory._id}`)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.id).to.equal(testSubcategory._id.toString());
          done();
        });
    });
    it('should return 404 error if no subcategories is found with given id', (done) => {
      request(app)
        .get(`/subcategories/${randomString()}`)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Not found');
          done();
        });
    });
  });
});
