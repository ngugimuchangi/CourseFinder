import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import { randomBytes } from 'crypto';
import User from '../../models/user';
import Token from '../../models/token';
import app from '../server';

dotenv.config();

chai.use(chaiHttp);
const { expect, request } = chai;

describe('Verification endpoints tests', () => {
  let db;
  let redis;
  let user;
  let authToken;
  let emailToken;
  let passwordToken;

  before(async () => {
    redis = createClient({ url: process.env.REDIS_TEST_URI });
    await redis.connect();
    db = await mongoose.connect(process.env.DB_TEST_URI);
    user = new User({ email: 'user@mail.com', password: 'supersecret' });
    emailToken = new Token({
      user: user._id,
      role: 'verify',
      token: randomBytes(32).toString('hex'),
    });
    await user.save();
    await emailToken.save();
    authToken = randomBytes(32).toString('hex');
    await redis.set(`auth_${authToken}`, user._id.toString());
  });

  after(async () => {
    await db.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('GET /auth/verify-email', () => {
    it('should generate email verification token for logged in user', (done) => {
      request(app)
        .get('/auth/verify-email')
        .set('X-Token', authToken)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(204);
          done();
        });
    });
  });

  describe('PUT /auth/verify-email/:userId/:token', () => {
    it('should return 401 error for non-existent user', (done) => {
      request(app)
        .put(`/auth/verify-email/12344494/${emailToken.token}`)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
    it('should return 401 error for wrong token', (done) => {
      request(app)
        .put(`/auth/verify-email/${user._id}/${randomBytes(32).toString('hex')}`)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
    it('should verify user if user id and token are correct', (done) => {
      request(app)
        .put(`/auth/verify-email/${user._id}/${emailToken.token}`)
        .end(async (error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.verified).to.be.true;
          user = await User.findById(user._id);
          expect(user.verified).to.be.true;
          done();
        });
    });
  });
});
