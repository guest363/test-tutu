process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const prepareCake = require('../prepareCake');
const prepareCakeFP = require('../prepareFP');

describe('Готовим блинчики', () => {
  describe('Простые тесты для математики', () => {
    it('Набор 1', () => {
      prepareCake(3).should.be.equal(3);
      prepareCake(2).should.be.equal(2);
      prepareCake(5).should.be.equal(5);
      prepareCake(4).should.be.equal(4);
      prepareCake(4, 4).should.be.equal(2);
      prepareCake(4, 3).should.be.equal(3);
      prepareCake(5, 3).should.be.equal(3);
      prepareCake(6, 3).should.be.equal(4);
    });
  });
  describe('FP', () => {
    it('Набор', () => {
      prepareCakeFP().should.be.equal(3);
    });
  });
});
