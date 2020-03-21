process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const origin = require('../origin');
const refactoring = require('../refactoring');


describe('Задача 5', () => {
  describe('Сравнить результаты оригинальной функции и рефакторинга', () => {
    it('Набор 1', () => {
      origin(20).should.be.equal(refactoring(20));
      origin(1).should.be.equal(refactoring(1));
      origin(68).should.be.equal(refactoring(68));
      origin(100).should.be.equal(refactoring(100));
    });
  });
});
