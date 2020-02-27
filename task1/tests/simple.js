process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const dscount = require('../dscount');

describe('Проверка функции dscount', () => {
  describe('Простые тесты', () => {
    it('Набор от Туту', () => {
      dscount('ab___ab__', 'a', 'b').should.be.a('number');
      dscount('ab___ab__', 'a', 'b').should.be.equal(2);
      dscount('___cd____', 'c', 'd').should.be.equal(1);
      dscount('de_______', 'd', 'e').should.be.equal(1);
      dscount('12_12__12', '1', '2').should.be.equal(3);
      dscount('_ba______', 'a', 'b').should.be.equal(0);
      dscount('_a__b____', 'a', 'b').should.be.equal(0);
      dscount('-ab-аb-ab', 'a', 'b').should.be.equal(2);
      dscount('aAa', 'a', 'a').should.be.equal(2);
    });
    it('Дополнительный набор', () => {
      dscount('sssDwwdxxasdSdsdcxc\nwss', 's', 's').should.be.equal(3);
      dscount('--=_=-==-=', '=', '-').should.be.equal(2);
      dscount('\\\\\\', '\\', '\\').should.be.equal(2);
      dscount(1111, 1, 1).should.be.equal(3);
      dscount(1111).should.be.equal(0);
    });
  });
});
