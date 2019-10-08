
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