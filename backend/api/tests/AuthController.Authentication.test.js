import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import User from '../../models/user';
import app from '../server';

dotenv.config();
chai.use(chaiHttp);
const { expect, request } = chai;

describe('Authentication endpoints tests', () => {
  let db;
  let redis;
  let user;
  let token;

  before(async () => {
    redis = createClient({ url: process.env.REDIS_TEST_URI });
    await redis.connect();
    db = await mongoose.connect(process.env.DB_TEST_URI);
    user = new User({ email: 'user@mail.com', password: 'supersecret' });
    user.hashPassword();
    await user.save();
  });

  after(async () => {
    await db.connection.dropDatabase();
    await mongoose.connection.close();
    const keys = await redis.keys('auth_*');
    const keyDeletionPromises = [];
    for (const key of keys) {
      keyDeletionPromises.push(redis.del(key));
    }
    await Promise.all(keyDeletionPromises);
    await redis.quit();
  });

  describe('POST /auth/login', () => {
    it('should return 400 error for missing email', (done) => {
      request(app)
        .post('/auth/login')
        .send()
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal('Missing email');
          done();
        });
    });
    it('should return 400 error for missing password', (done) => {
      request(app)
        .post('/auth/login')
        .send({ email: user.email })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal('Missing password');
          done();
        });
    });
    it('should return 401 error for wrong email', (done) => {
      request(app)
        .post('/auth/login')
        .send({ email: 'wrong.mail.com', password: user.password })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body.error).to.be.equal('Unauthorized');
          done();
        });
    });
    it('should return 401 error for wrong password', (done) => {
      request(app)
        .post('/auth/login')
        .send({ email: user.email, password: 'wrong password' })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body.error).to.be.equal('Unauthorized');
          done();
        });
    });
    it('should return authentication token for correct credentials', (done) => {
      request(app)
        .post('/auth/login')
        .send({ email: user.email, password: 'supersecret' })
        .end((error, res) => {
          token = res.body.token;
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
    it('should allow logged in user to access restricted path', (done) => {
      request(app)
        .get('/users/me')
        .set('X-Token', token)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('GET /auth/logout', () => {
    it('should logout user', (done) => {
      request(app)
        .get('/auth/logout')
        .set('X-Token', token)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(204);
          done();
        });
    });
    it('should prevent logged out user from accessing restricted path', (done) => {
      request(app)
        .get('/users/me')
        .set('X-Token', token)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
  });
});
