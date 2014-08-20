'use strict';

var Plane = module.exports = function(){
  // Flight status
  this.status = {
    pitch: 10,
    speed: 300,
    heading: 185,
    roll: 0,
    altitude: 100,
    verticalSpeed: 0
  };
  // All values of control surface are -1 ~ 1, 0 is neutral, -1 being extreme left or down, 1 being extreme right or up
  this.controls = {
    rudder: 0,
    elevator: 0,
    aileron: 0,
    throttle: 0
  };
};

Plane.prototype.control = function(ctrl) {
  if(ctrl.rudder)   this.controls.rudder   = ctrl.rudder;
  if(ctrl.elevator) this.controls.elevator = ctrl.elevator;
  if(ctrl.aileron)  this.controls.aileron  = ctrl.aileron;
  if(ctrl.throttle) this.controls.throttle = ctrl.throttle;
}

var pd = 1;

Plane.prototype.update = function(t) { // t in seconds

  this.status.pitch += (Math.random() - 0.2) * pd * 2;
  this.status.speed += (Math.random() - 0.5) * 1;
  this.status.heading += (Math.random() - 0.5) * 2;
  this.status.roll += (Math.random() - 0.5) * 2 ;
  if(Math.abs(this.status.pitch) > 20) pd = -pd;
  this.status.altitude += 10;//(Math.random() - 0.5) * 0.2;
  this.status.verticalSpeed += (Math.random() - 0.5) * 0.01;
};


Plane.prototype.getStatus = function(t) { // t in seconds
  return this.status;
};
