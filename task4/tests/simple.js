process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const origin = require('../origin');
const refactoring = require('../refactoring');
const str1 = `asdsacewvsjlvsjewpieygfuwofjvpsuz8g3`;

describe('Сравнение функция задачи 4', () => {
  describe('Простые тесты', () => {
    it('Набор 1', () => {
      origin(str1, 'a', 'v').should.be.equal(refactoring(str1, 'a', 'v'));
      origin(str1, 'w', 'v').should.be.equal(refactoring(str1, 'w', 'v'));
      origin(str1, '6', '5').should.be.equal(refactoring(str1, '6', '5'));
    });
  });
});
