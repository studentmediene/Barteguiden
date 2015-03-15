'use strict';

describe('Service: Imageservice', function () {

  // load the service's module
  beforeEach(module('barteguidenMarkedsWebApp'));

  // instantiate service
  var Imageservice;
  beforeEach(inject(function (_Imageservice_) {
    Imageservice = _Imageservice_;
  }));

  it('should do something', function () {
    expect(!!Imageservice).toBe(true);
  });

});
