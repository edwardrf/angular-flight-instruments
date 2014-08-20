'use strict';

describe('Directive: pfd', function () {

  // load the directive's module and view
  beforeEach(module('angularFlightInstrumentsApp'));
  beforeEach(module('app/pfd/pfd.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pfd></pfd>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the pfd directive');
  }));
});