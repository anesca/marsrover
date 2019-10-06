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
                message: 'Coordinates not valid.',
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
                message: 'Coordinates not valid.',
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