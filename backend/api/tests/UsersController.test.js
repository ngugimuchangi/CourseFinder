import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createClient } from 'redis';
import { randomBytes } from 'crypto';
import User from '../models/user';
import Course from '../models/course';
import emailJobs from '../jobs/emailJobs';
import app from '../server';

dotenv.config();
chai.use(chaiHttp);
const { expect, request } = chai;

describe('Users endpoints tests', () => {
  let db;
  let redis;
  let testUser;
  let authToken;
  let emailStub;
  let testCourse;
  const newPassword = 'anothersupersecret';
  const randomString = () => randomBytes(16).toString('hex');

  before(async () => {
    // Stub to prevent creation of email jobs
    emailStub = sinon.stub(emailJobs, 'addEmailJob').callsFake(() => console.log('Email sent'));

    // Redis and DB connection
    db = await mongoose.connect(process.env.DB_TEST_URI);
    redis = createClient({ url: process.env.REDIS_TEST_URI });
    await redis.connect();

    // User data setup
    testUser = new User({ email: 'test_user@mail.com', password: 'supersecret' });
    testUser.hashPassword();
    testUser.verified = true;
    testCourse = new Course({
      title: randomString(),
      provider: randomString(),
      description: randomString(),
      category: new mongoose.Types.ObjectId(),
      url: randomString(),
      imageUrl: randomString(),
    });

    authToken = randomString();
    await testUser.save();
    await testCourse.save();
    await redis.set(`auth_${authToken}`, testUser._id.toString());
  });

  after(async () => {
    await db.connection.dropDatabase();
    await mongoose.connection.close();
    await redis.del(`auth_${authToken}`);
    await redis.quit();
  });

  describe('POST /users', () => {
    it('should create new user', (done) => {
      request(app)
        .post('/users')
        .send({ email: 'new_user.email.com', password: 'supersecret' })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).have.keys('id', 'email', 'verified', 'topics', 'bookmarks');
          expect(res.body.verified).to.be.false;
          expect(emailStub.calledOnce).to.be.true;
          done();
        });
    });
    it('should prevent creation of user account with existing email', (done) => {
      request(app)
        .post('/users')
        .send({ email: 'new_user.email.com', password: 'supersecret' })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(409);
          expect(res.body.error).to.equal('User already exists');
          done();
        });
    });
    it('should return error 400 for missing email', (done) => {
      request(app)
        .post('/users')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Missing email');
          done();
        });
    });
    it('should return error 400 for missing password', (done) => {
      request(app)
        .post('/users')
        .send({ email: 'new_user.email.com' })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Missing password');
          done();
        });
    });
  });

  describe('GET /users/me', () => {
    it('should return user details', (done) => {
      request(app)
        .get('/users/me')
        .set('X-Token', authToken)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.keys('id', 'email', 'verified', 'topics', 'bookmarks');
          expect(res.body.id).to.equal(testUser._id.toString());
          done();
        });
    });

    it('should return 401 error for unauthorized user', (done) => {
      request(app)
        .get('/users/me')
        .set('X-Token', randomString())
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
  });

  describe('PUT /users/me/email', () => {
    it('should change user email', (done) => {
      request(app)
        .put('/users/me/email')
        .set('X-Token', authToken)
        .send({ email: 'another_email@mail.com' })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.keys('id', 'email', 'verified', 'topics', 'bookmarks');
          expect(res.body.email).to.equal('another_email@mail.com');
          expect(res.body.verified).to.be.false;
          expect(emailStub.calledTwice).to.be.true;
          done();
        });
    });
    it('should return 400 error for missing email', (done) => {
      request(app)
        .put('/users/me/email')
        .set('X-Token', authToken)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Missing email');
          done();
        });
    });
    it('should return 409 error for email with existing user', (done) => {
      request(app)
        .put('/users/me/email')
        .set('X-Token', authToken)
        .send({ email: 'another_email@mail.com' })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(409);
          expect(res.body.error).to.equal('An account with this email already exists');
          done();
        });
    });
    it('should return 401 error for unauthorized user', (done) => {
      request(app)
        .put('/users/me/email')
        .set('X-Token', randomString())
        .send({ email: 'another_email@mail.com' })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
  });

  describe('PUT /users/me/password', () => {
    it('should change user email', (done) => {
      request(app)
        .put('/users/me/password')
        .set('X-Token', authToken)
        .send({ password: newPassword })
        .end(async (error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(204);
          testUser = await User.findById(testUser._id);
          expect(testUser.isValidPassword(newPassword)).to.be.true;
          done();
        });
    });
    it('should return 400 error for missing password', (done) => {
      request(app)
        .put('/users/me/password')
        .set('X-Token', authToken)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Missing password');
          done();
        });
    });
    it('should return 401 error for unauthorized user', (done) => {
      request(app)
        .put('/users/me/password')
        .set('X-Token', randomString())
        .send({ password: randomString() })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
  });

  describe('PUT /users/me/topics', () => {
    it('should add a topic to user list of topics', (done) => {
      request(app)
        .put('/users/me/topics')
        .query({ action: 'add' })
        .set('X-Token', authToken)
        .send({ topic: 'machine learning' })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.topics).to.be.an('Array').with.lengthOf(1);
          expect(res.body.topics[0]).to.equal('machine learning');
          done();
        });
    });
    it('should not add topic if it already exists in list of topics', (done) => {
      request(app)
        .put('/users/me/topics')
        .query({ action: 'add' })
        .set('X-Token', authToken)
        .send({ topic: 'machine learning' })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.topics).to.be.an('Array').with.lengthOf(1);
          expect(res.body.topics[0]).to.equal('machine learning');
          done();
        });
    });
    it('should delete a topic to user list of topics', (done) => {
      request(app)
        .put('/users/me/topics')
        .query({ action: 'del' })
        .set('X-Token', authToken)
        .send({ topic: 'machine learning' })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.topics).to.be.an('Array').with.lengthOf(0);
          done();
        });
    });
    it('should not raise conflict when deleting operation is not in list of topics', (done) => {
      request(app)
        .put('/users/me/topics')
        .query({ action: 'del' })
        .set('X-Token', authToken)
        .send({ topic: 'machine learning' })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.topics).to.be.an('Array').with.lengthOf(0);
          done();
        });
    });
    it('should return 400 error for missing topic', (done) => {
      request(app)
        .put('/users/me/topics')
        .query({ action: 'add' })
        .set('X-Token', authToken)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Missing topic');
          done();
        });
    });
    it('should return 400 error for missing action query parameter', (done) => {
      request(app)
        .put('/users/me/topics')
        .set('X-Token', authToken)
        .send({ topic: 'machine learning' })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Missing action parameter');
          done();
        });
    });
    it('should return 400 error for invalid action query parameter', (done) => {
      request(app)
        .put('/users/me/topics')
        .query({ action: 'test' })
        .set('X-Token', authToken)
        .send({ topic: 'machine learning' })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Invalid action');
          done();
        });
    });
    it('should return 401 error for unauthorized user', (done) => {
      request(app)
        .put('/users/me/topics')
        .query({ action: 'add' })
        .set('X-Token', randomString())
        .send({ topic: 'machine learning' })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
  });

  describe('PUT /users/me/bookmarks', () => {
    it('should add a course to user list bookmarks', (done) => {
      request(app)
        .put('/users/me/bookmarks')
        .query({ action: 'add' })
        .set('X-Token', authToken)
        .send({ courseId: testCourse._id.toString() })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.bookmarks).to.be.an('Array').with.lengthOf(1);
          done();
        });
    });
    it('should not course if it already exists in list of bookmarks', (done) => {
      request(app)
        .put('/users/me/bookmarks')
        .query({ action: 'add' })
        .set('X-Token', authToken)
        .send({ courseId: testCourse._id.toString() })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.bookmarks).to.be.an('Array').with.lengthOf(1);
          done();
        });
    });
    it('should delete a bookmark to user list of bookmarks', (done) => {
      request(app)
        .put('/users/me/bookmarks')
        .query({ action: 'del' })
        .set('X-Token', authToken)
        .send({ courseId: testCourse._id.toString() })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.bookmarks).to.be.an('Array').with.lengthOf(0);
          done();
        });
    });
    it('should not raise conflict when deleting a bookmark not in list of bookmarks', (done) => {
      request(app)
        .put('/users/me/bookmarks')
        .query({ action: 'del' })
        .set('X-Token', authToken)
        .send({ courseId: testCourse._id.toString() })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.bookmarks).to.be.an('Array').with.lengthOf(0);
          done();
        });
    });
    it('should return 400 error for missing bookmark', (done) => {
      request(app)
        .put('/users/me/bookmarks')
        .query({ action: 'add' })
        .set('X-Token', authToken)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Missing course id');
          done();
        });
    });
    it('should return 404 if course does not exists', (done) => {
      request(app)
        .put('/users/me/bookmarks')
        .query({ action: 'add' })
        .set('X-Token', authToken)
        .send({ courseId: randomString() })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Not found');
          done();
        });
    });
    it('should return 400 error for missing action query parameter', (done) => {
      request(app)
        .put('/users/me/bookmarks')
        .set('X-Token', authToken)
        .send({ courseId: testCourse._id.toString() })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Missing action parameter');
          done();
        });
    });
    it('should return 400 error for invalid action query parameter', (done) => {
      request(app)
        .put('/users/me/bookmarks')
        .query({ action: 'test' })
        .set('X-Token', authToken)
        .send({ courseId: testCourse._id.toString() })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Invalid action');
          done();
        });
    });
    it('should return 401 error for unauthorized user', (done) => {
      request(app)
        .put('/users/me/bookmarks')
        .query({ action: 'add' })
        .set('X-Token', randomString())
        .send({ courseId: testCourse._id.toString() })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
  });

  describe('DELETE /users/me', () => {
    it('should return 401 error for unauthorized user', (done) => {
      request(app)
        .delete('/users/me')
        .set('X-Token', randomString())
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
    it('should delete user', (done) => {
      request(app)
        .delete('/users/me')
        .set('X-Token', authToken)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(204);
          done();
        });
    });
    it('should return 401 error for deleted user', (done) => {
      request(app)
        .delete('/users/me')
        .set('X-Token', authToken)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
  });
});
