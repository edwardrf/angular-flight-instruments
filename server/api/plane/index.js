'use strict';

var Plane = require('./plane');
var planes = [];

module.exports = function(io) {
  io.of('/plane')
  .on('connection', function(socket){
    var plane = new Plane();
    plane.socket = socket;
    planes.push(plane);

    socket.on('disconnect', function(){
      planes.splice(planes.indexOf(plane), 1);
    });

    socket.on('control', function(ctrl){
      console.log('Control received: ' + ctrl);
      plane.control(ctrl);
    });
  })
}

function updateAllPlanes() {
  for(var i in planes) {
    var plane = planes[i];
    plane.update();
    plane.socket.emit('status', plane.getStatus());
  }
}

setInterval(updateAllPlanes, 500);
