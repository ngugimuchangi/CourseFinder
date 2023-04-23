import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import { randomBytes } from 'crypto';
import User from '../../models/user';
import Token from '../../models/token';
import EmailJobs from '../jobs/emailJobs';
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
  let emailStub;
  const newPassword = 'anothersupersecret😸';
  const randomString = () => randomBytes(32).toString('hex');

  before(async () => {
    emailStub = sinon.stub(EmailJobs, 'addEmailJob').callsFake(() => console.log('Email sent 😸'));
    redis = createClient({ url: process.env.REDIS_TEST_URI });
    await redis.connect();
    db = await mongoose.connect(process.env.DB_TEST_URI);
    user = new User({ email: 'user@mail.com', password: 'supersecret' });
    emailToken = new Token({
      user: user._id,
      role: 'verify',
      token: randomString(),
    });
    await user.save();
    await emailToken.save();
    authToken = randomString();
    await redis.set(`auth_${authToken}`, user._id.toString());
  });

  after(async () => {
    sinon.restore();
    await db.connection.dropDatabase();
    await mongoose.connection.close();
    await redis.del(`auth_${authToken}`);
    await redis.quit();
  });

  describe('GET /auth/verify-email', () => {
    it('should generate email verification token for logged in user', (done) => {
      request(app)
        .get('/auth/verify-email')
        .set('X-Token', authToken)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(204);
          expect(emailStub.calledOnce).to.be.true;
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
        .put(`/auth/verify-email/${user._id}/${randomString()}`)
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

  describe('POST /auth/reset-password', () => {
    it('should return 400 error if email is not provided', (done) => {
      request(app)
        .post('/auth/reset-password')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Missing email');
          done();
        });
    });
    it('should return 204 with no content even if user does not exists', (done) => {
      request(app)
        .post('/auth/reset-password')
        .send({ email: `${randomString()}@mail.com` })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(204);
          done();
        });
    });
    it('should return 204 with no content even the right credentials and save token to database', (done) => {
      request(app)
        .post('/auth/reset-password')
        .send({ email: user.email })
        .end(async (error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(204);
          passwordToken = await Token.findOne({ user: user._id, role: 'reset' });
          expect(passwordToken.user).to.deep.equal(user._id);
          expect(emailStub.calledTwice).to.be.true;
          done();
        });
    });
  });

  describe('PUT /auth/reset-password/:userId/:token', () => {
    it('should return 400 error if password is not provided', (done) => {
      request(app)
        .put(`/auth/reset-password/${user._id}/${passwordToken.token}`)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Missing password');
          done();
        });
    });
    it('should return 401 with wrong user id', (done) => {
      request(app)
        .put(`/auth/verify-email/${randomString()}/${passwordToken.token}`)
        .send({ password: newPassword })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
    it('should return 401 error with wrong token', (done) => {
      request(app)
        .put(`/auth/verify-email/${user._id}/${randomString()}`)
        .send({ password: newPassword })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
    it('should change user password with the right token ', (done) => {
      request(app)
        .put(`/auth/reset-password/${user._id}/${passwordToken.token}`)
        .send({ password: newPassword })
        .end(async (error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(204);
          user = await User.findById(user._id);
          expect(user.isValidPassword(newPassword)).to.be.true;
          done();
        });
    });
  });
});
