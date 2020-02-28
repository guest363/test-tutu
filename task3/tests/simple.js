process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const prepareCake = require('../prepareCake');

describe('Готовим блинчики', () => {
  describe('Простые тесты', () => {
    it('Набор 1', () => {
      prepareCake(3).should.be.equal(3);
    });
  });
});
