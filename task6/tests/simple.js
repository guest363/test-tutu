process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const parceUrl = require("../parceUrl");
const URL1 = `http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo`;

describe("Задача 6", () => {
  describe("Парсинг заданной строки", () => {
    it("Набор 1", () => {
      parceUrl(URL1).host.should.be.equal(`tutu.ru:8080`);
      parceUrl(URL1).href.should.be.equal(URL1);
      parceUrl(URL1).protocol.should.be.equal(`http:`);
      parceUrl(URL1).hostname.should.be.equal(`tutu.ru`);
      parceUrl(URL1).pathname.should.be.equal(`/do/any.php`);
      parceUrl(URL1).origin.should.be.equal(`http://tutu.ru:8080`);
      parceUrl(URL1).hash.should.be.equal(`#foo`);
    });
  });
});
