'use strict';

describe('Filter: eventFilter', function () {

  // load the filter's module
  beforeEach(module('barteguidenMarkedsWebApp'));

  // initialize a new instance of the filter before each test
  var eventFilter;
  beforeEach(inject(function ($filter) {
    eventFilter = $filter('eventFilter');
  }));

  it('should return the input prefixed with "eventFilter filter:"', function () {
    var text = 'angularjs';
    expect(eventFilter(text)).toBe('eventFilter filter: ' + text);
  });

});
