'use strict';

angular.module('angularFlightInstrumentsApp')
  .service('planeSocket', function (socketFactory) {
    console.log("Returning socket factory");
    var socket = io.connect('/plane');
    socket.emit('wtf');
    console.log("IOSOCKET", socket);
    return socketFactory({
      ioSocket: socket
    });
  });
