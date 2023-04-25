import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp)
const { expect, request } = chaiHttp;

describe('Courses endpoints tests', () => {
  before(async () => {});

  after(async () => {});
  
  describe('GET /courses', () => {});
  
  describe('GET /course:id', () => {});
});
