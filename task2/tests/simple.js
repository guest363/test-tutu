process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const checkSyntax = require('../checkSyntax');

describe('Проверка функции checkSyntax', () => {
  describe('Простые тесты', () => {
    it('Набор от Туту', () => {
      checkSyntax("<>---(++++)----").should.be.a('number');
      checkSyntax("---(++++)----").should.be.equal(0);
      checkSyntax('"before ( middle []) after "').should.be.equal(0);
      checkSyntax(") (").should.be.equal(1);
      checkSyntax("} {").should.be.equal(1);
      checkSyntax("<(   >)").should.be.equal(1);
      checkSyntax("(  [  <>  ()  ]  <>  )").should.be.equal(0);
      checkSyntax("   (      [)").should.be.equal(1);
    });
    it('Дополнительный набор', () => {
      checkSyntax(202).should.be.equal(0);
      checkSyntax({}).should.be.equal(0);
      checkSyntax().should.be.equal(0);
      checkSyntax('{{{}><>').should.be.equal(1);
      checkSyntax('{[<<>[]]}').should.be.equal(1);
    });
  });
});
