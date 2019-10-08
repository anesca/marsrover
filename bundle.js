(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var roverNavigation;

roverNavigation = {

    validateZone: function(coords) {

        if (coords.x > 0 && coords.y > 0) {
            return {
                valid: true,
                message: '',
                x: coords.x,
                y: coords.y
            };
        } else {
            return {
                valid: false,
                message: 'Zone coordinates not valid.',
                x: 0,
                y: 0
            };
        }

    },

    validateRoverPosition: function(position) {

        if (position.x > 0 && position.y > 0) {

            if (['N', 'S', 'E', 'W'].indexOf(position.d.toUpperCase()) >= 0) {
                return {
                    valid: true,
                    message: '',
                    x: position.x,
                    y: position.y,
                    d: position.d
                };
            } else {
                return {
                    valid: false,
                    message: 'Direction not valid.',
                    x: 0,
                    y: 0,
                    d: ''
                };
            }
            
        } else {
            return {
                valid: false,
                message: 'Position coordinates not valid.',
                x: 0,
                y: 0,
                d: ''
            };
        }

    },

    validateMovement: function(movement) {

        const letters = /^[M, L, R]+$/;
        if ((movement.toUpperCase()).match(letters)) {
            return {
                valid: true,
                message: ''
            }
        } else {
            return {
                valid: false,
                message: 'Movement string is invalid.'
            }
        }

    },

    doMovement: function(command) {

        let newPos = {
            x: command.currentPos.x,
            y: command.currentPos.y,
            d: command.currentPos.d
        }

        // Loop through each letter
        for (let i = 0; i < command.movement.length; i++) {

            if (command.movement[i].toUpperCase() === 'M') {

                switch (newPos.d.toUpperCase()) {
                    case 'N':
                        newPos.y++;
                        break;
                    case 'E':
                        newPos.x++;
                        break;
                    case 'S':
                        newPos.y--;
                        break;
                    case 'W':
                        newPos.x--;
                        break;
                }

                // Check that rover does not go out of bounds
                if (newPos.y < 0) {
                    newPos.y = 0;
                } else if (newPos.x < 0) {
                    newPos.x = 0;
                }
                if (newPos.y > command.zoneBounds.y) {
                    newPos.y = command.zoneBounds.y;
                } else if (newPos.x > command.zoneBounds.x) {
                    newPos.x = command.zoneBounds.x;
                }

            } else if (command.movement[i].toUpperCase() === 'L') {

                switch (newPos.d.toUpperCase()) {
                    case 'N':
                        newPos.d = 'W';
                        break;
                    case 'E':
                        newPos.d = 'N';
                        break;
                    case 'S':
                        newPos.d = 'E';
                        break;
                    case 'W':
                        newPos.d = 'S';
                        break;
                }

            } else if (command.movement[i].toUpperCase() === 'R') {

                switch (newPos.d.toUpperCase()) {
                    case 'N':
                        newPos.d = 'E';
                        break;
                    case 'E':
                        newPos.d = 'S';
                        break;
                    case 'S':
                        newPos.d = 'W';
                        break;
                    case 'W':
                        newPos.d = 'N';
                        break;
                }

            }

        }

        return newPos;

    },

};

module.exports = roverNavigation;


},{}],2:[function(require,module,exports){

const roverNavigation = require('./rover-navigation');

nextStep();

// Fucntions
function nextStep() {

    document.getElementById('js-next-step').addEventListener('click', function() {

        // Get inputs
        const zoneX = document.getElementById('zone-x').value;
        const zoneY = document.getElementById('zone-y').value;

        const positionX = document.getElementById('position-x').value;
        const positionY = document.getElementById('position-y').value;
        const direction = document.getElementById('direction').value;

        console.log(zoneX, zoneY, positionX, positionY, direction);

        const zoneValidation = roverNavigation.validateZone({ 
            x: zoneX, 
            y: zoneY 
        });
        const positionValidation = roverNavigation.validateRoverPosition({ 
            x: positionX, 
            y: positionY, 
            d: direction 
        });

        if (!zoneValidation.valid || !positionValidation.valid) {
            alert(zoneValidation.message + ' ' + positionValidation.message);
        } else {
            initNavigation(zoneX, zoneY, positionX, positionY, direction);
        }

        
    });

}

function initNavigation(zoneX, zoneY, positionX, positionY, direction) {

    let currentPosX, currentPosY, currentDirection;

    currentPosX = positionX;
    currentPosY = positionY;
    currentDirection = direction;

    document.getElementById('js-step-1').style.display = 'none';
    document.getElementById('js-step-2').style.display = 'block';

    document.getElementById('js-move-rover').addEventListener('click', function() {

        const moveCommand = document.getElementById('movement').value;

        console.log(moveCommand);

        const moveValidation = roverNavigation.validateMovement(moveCommand);

        if (!moveValidation.valid) {
            alert(moveValidation.message);
        } else {
            
            const newPosition = roverNavigation.doMovement({
                zoneBounds: {
                    x: zoneX,
                    y: zoneY,
                },
                currentPos: {
                    x: currentPosX,
                    y: currentPosY,
                    d: currentDirection
                },
                movement: moveCommand
            });

            console.log(newPosition);

            // Set the current position to the new position
            currentPosX = newPosition.x;
            currentPosY = newPosition.y;
            currentDirection = newPosition.d;

            outputNewPosition(moveCommand, newPosition);

        }


    });

}

function outputNewPosition(moveCommand, newPosition) {

    const outputElement = document.getElementById('js-output-box');
    const outputString = `<span>${moveCommand}</span> <i>${newPosition.x}, ${newPosition.y} - ${newPosition.d}</i>`;

    outputElement.innerHTML += outputString;

}
},{"./rover-navigation":1}]},{},[2]);
