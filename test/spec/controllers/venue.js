'use strict';

describe('Controller: VenueCtrl', function () {

  // load the controller's module
  beforeEach(module('barteguidenMarkedsWebApp'));

  var VenueCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VenueCtrl = $controller('VenueCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
