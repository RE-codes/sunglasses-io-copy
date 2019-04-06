const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/server');

const should = chai.should();

chai.use(chaiHttp);

describe('BRANDS', () => {
  describe('GET /api/brands', () => {
    it('should return an array of all the brands', done => {
      // arrange
      // act
      chai
        .request(server)
        .get('/api/brands')
        .end((error, response) => {
          // assert
          response.status.should.equal(200);
          response.body.should.be.an('array');
          response.body.should.have.length(5);
          done();
        });
    });
    it('should return the number of brands in the query', done => {
      // arrange: "limit=4"
      // act
      chai
        .request(server)
        .get('/api/brands?limit=4')
        .end((error, response) => {
          // assert
          response.status.should.equal(200);
          response.body.should.be.an('array');
          response.body.should.have.length(4);
          done();
        });
    });
    it('should return an error if the query is incorrectly formatted', done => {
      // arrange: "limit=boogers"
      // act
      chai
        .request(server)
        .get('/api/brands?limit=boogers')
        .end((error, response) => {
          // assert
          response.status.should.equal(400);
          done();
        });
    });
  });
  describe('GET /api/brands/:brandId/products', () => {
    it('should return an array of products with the given brandId', done => {
      // arrange: "brandId = 1"
      // act
      chai
        .request(server)
        .get('/api/brands/1/products')
        .end((error, response) => {
          // assert
          response.status.should.equal(200);
          response.body.should.be.an('array');
          response.body.should.have.length(3);
          done();
        });
    });
    it('should return an error if no products are found with that brandId', done => {
      // arrange: brandId = bob
      // act
      chai
        .request(server)
        .get('/api/brands/bob/products')
        .end((error, response) => {
          // assert
          response.status.should.equal(404);
          done();
        });
    });
  });
});

describe('PRODUCTS', () => {
  describe('GET /api/products', () => {
    it('should return all products when there is no search criteria', done => {
      // arrange
      // act
      chai
        .request(server)
        .get('/api/products')
        .end((error, response) => {
          // assert
          response.status.should.equal(200);
          response.body.should.be.an('array');
          response.body.should.have.length(11);
          done();
        });
    });
    it('should return all products matching the given search term (brand)', () => {
      // arrange: search=Oakley (brand case)
      // act
      chai
        .request(server)
        .get('/api/products?search=Oakley')
        .then(response => {
          // assert
          response.status.should.equal(200);
          response.body.should.be.an('array');
          response.body.should.have.length(3);
        })
        .catch(error => console.log(error));
    });
    it('should return all products matching the given search term (name)', done => {
      // arrange: search=qdogs
      // act
      chai
        .request(server)
        .get('/api/products?search=qdogs')
        .end((error, response) => {
          // assert
          response.status.should.equal(200);
          response.body.should.be.an('array');
          response.body.should.have.length(1);
          done();
        });
    });
    it('should return all products matching the given search term (description)', done => {
      // arrange: search=
      // act
      chai
        .request(server)
        .get('/api/products?search=best')
        .end((error, response) => {
          // assert
          response.status.should.equal(200);
          response.body.should.be.an('array');
          response.body.should.have.length(4);
          done();
        });
    });
  });
  describe('LOGIN', () => {
    describe('POST /api/login', () => {
      it('should allow the user to login with an email and password');
    });
  });
});
