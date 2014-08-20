'use strict';

angular.module('angularFlightInstrumentsApp')
  .directive('pfd', ['$window', function ($window) {
    return {
      templateUrl: 'app/pfd/pfd.html',
      restrict: 'E',
      scope: {
        plane: '='
      },
      link: function (scope, ele, attrs) {

        // TODO: Replace this DOM manipulation with SVG canvas drawing.
        function updateDisplay(){
          var container = ele.find('.pfd-container');
          var size = container.width();// Base size for all calculation.
          container.height(size); // Fix perspective to a perfect square.
          var degSize = size / 60;
          var deltaY = 1 - 25 / 150; // The offset of the adi mask to the top, center of the mask is at (150, 125) for 300x300 image

          // FIX Base font size
          container.css('font-size: ' + size / 25 + 'px');


          var back = ele.find('.pfd-back');
          back.height(size);

          // ADI  attitude director indicator
          var adiBack = ele.find('.pfd-adi-back'); // adi-back whole adi moving div
          var adiBackImg = adiBack.find('img'); // Blue/brown bg image
          adiBack.width(size);
          adiBack.height(adiBackImg.height());
          var adiBackTop =  - (adiBack.height() / 2 - size / 2 * deltaY); // (Height of background - Hight of display) / 2;
          var adiBackLeft = 0;
          adiBack.css('top', adiBackTop + 'px');
          adiBack.css('left', adiBackLeft + 'px');
          adiBack.css('transform', 'rotate(' + scope.plane.roll + 'deg)' + 'translate(0, ' + scope.plane.pitch * degSize + 'px)'); // Roll

          // Now move the line markers
          var adiMarkers = adiBack.find('.adi-markers');
          var adiMarker = adiMarkers.find('.adi-marker');
          var adiMarkerLines = adiMarkers.find('.line');

          var lineHeight = degSize * 10 / 4;

          adiMarker.css('width', lineHeight * 6 + 'px');
          adiMarker.css('height', lineHeight + 'px');
          adiMarker.css('font-size', lineHeight + 'px');
          adiMarker.css('line-height', lineHeight + 'px');
          adiMarkerLines.css('height', degSize / 5 + 'px');

          adiMarkers.css('top', Math.round(adiBack.height() / 2 - adiMarkers.height() / 2));
          adiMarkers.css('left', Math.round(adiBack.width() / 2 - adiMarkers.width() / 2));

          // Roll indicator
          var adiRoll = container.find('.pfd-adi-roll');
          var adiRollTop = Math.round(-( adiRoll.height() / 2 - size / 2 * deltaY));
          var adiRollLeft = Math.round(-( adiRoll.width() / 2 - size / 2));
          adiRoll.css('top', adiRollTop);
          adiRoll.css('left', adiRollLeft);
          adiRoll.css('transform', 'rotate(' + scope.plane.roll + 'deg)'); // Roll

          // HSI
          var hsiFace = container.find('.pfd-hsi-face');
          var hsiMarks = container.find('.pfd-hsi-marks');
          hsiFace.css('transform', 'rotate(' + -scope.plane.heading + 'deg)'); // Roll
          hsiMarks.css('font-size', size / 25 + 'px'); // Roll


          // alt
          var alt = container.find('.pfd-alt');
          var altMarks = alt.find('.pfd-alt-marks');
          var altFrame = container.find('.pfd-alt-frame');
          var altOffset = 150 - ((scope.plane.altitude % 100) * 0.8); // This altOffset is set related to size of the marker div, which is determined by the code in function getAltitudeRange. FIXME: Both should be related to a same constant.
          altMarks.css('top', '-' + altOffset + '%');
          altMarks.css('font-size', size / 30 + 'px');
          altFrame.find('.alt-frame-text-big').css('font-size', size / 28 + 'px');
          altFrame.find('.alt-frame-text-small').css('font-size', size / 36 + 'px');


          // asi Air Speed Indicator
          var asi = container.find('.pfd-asi');
          var asiMarks = asi.find('.pfd-asi-marks');
          var asiFrame = container.find('.pfd-asi-frame');
          var asiOffset = 150 - ((scope.plane.speed % 10) * 8.2);
          asiMarks.css('top', '-' + asiOffset + '%');
          asiMarks.css('font-size', size / 30 + 'px');
          asiFrame.css('font-size', size / 28 + 'px');

          // vsi Vertical Speed Indicator
          var vsi = container.find('.pfd-vsi');
          var vsiArrow = vsi.find('.pfd-vsi-arrow');
          var vs = scope.plane.verticalSpeed;
          var vsiOffset = 259 - (0.7 * vs * vs * vs - 12.6 * vs * vs + 74.9 * vs); // Polynormial curve proximated based on the scale.
          vsiArrow.css('top', vsiOffset + '%');

        }

        $($window).load(updateDisplay); // Update Display when all images are loaded

        scope.$watch('plane', function(oldp, newp) {
          updateDisplay();
        }, true);

        scope.getBigAlt = function(alt) {
          var v = alt > 0 ? alt : -alt;
          var n = '' + Math.floor(v / 100);
          while(n.length < 3) n = '0' + n;
          if(alt < 0) n = '-' + n;
          return n;
        }

        scope.getSmallAlt = function(alt) {
          var n = Math.floor(alt % 100);
          if(n < 10)
            return '0' + n;
          else
            return '' + n;
        }

        scope.getAltitudeRange = function() {
          var altMarks = [];
          var start = Math.floor(scope.plane.altitude / 100) - 6;
          for(var i = start + 12; i > start; i--) {
            altMarks.push(scope.getBigAlt(i * 100));
          }
          return altMarks;
        }

        scope.getSpeedRange = function() {
          var speedMarks = [];
          var start = Math.floor((scope.plane.speed - 60) / 10) * 10;
          for(var i = start + 120; i > start; i-=10) {
            speedMarks.push(i);
          }
          return speedMarks;
        }
      }
    };
  }]);
