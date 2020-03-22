"use strict";
/**
 * Парсит URL
 * @param {String} url
 * @returns {Object} {
    href,
    protocol,
    hostname,
    port,
    pathname,
    hash,
    host,
    origin
  }
 * */

const parceUrl = url => {
  const reg = /^(\w*:)(?:\/{2})(.*)(?:\:)(\d*)(.*)(?:\?.*)(#.*$)/;
  const parcedUrl = {};
  [
    parcedUrl.href,
    parcedUrl.protocol,
    parcedUrl.hostname,
    parcedUrl.port,
    parcedUrl.pathname,
    parcedUrl.hash
  ] = url.toString().match(reg);
  parcedUrl.host = `${parcedUrl.hostname}:${parcedUrl.port}`;
  parcedUrl.origin = `${parcedUrl.protocol}//${parcedUrl.host}`;
  return parcedUrl;
};

module.exports = parceUrl;
