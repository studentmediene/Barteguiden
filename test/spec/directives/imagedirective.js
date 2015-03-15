'use strict';

describe('Directive: imagedirective', function () {

  // load the directive's module
  beforeEach(module('barteguidenMarkedsWebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<imagedirective></imagedirective>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the imagedirective directive');
  }));
});
