'use strict';

describe('Service: planeSocket', function () {

  // load the service's module
  beforeEach(module('angularFlightInstrumentsApp'));

  // instantiate service
  var planeSocket;
  beforeEach(inject(function (_planeSocket_) {
    planeSocket = _planeSocket_;
  }));

  it('should do something', function () {
    expect(!!planeSocket).toBe(true);
  });

});
