import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp)
const { expect, request } = chaiHttp;

describe('Categories endpoints tests', () => {
  before(async () => {});

  after(async () => {});

  describe('GET /categories', () => {});
  
  describe('GET /categories/:id', () => {});
  
  describe('GET /categories/:id/subcategories', () => {});
  
  describe('GET /subcategories', () => {});
  
  describe('GET /subcategories/:id', () => {});
});
