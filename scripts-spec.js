'use strict';
const expect = require('chai').expect;
const roverNavigation = require('./scripts');

describe('scriptsFetcher', function() {
    it('should exist', function() {
        const scriptsFetcher = require('./scripts.js');
        expect(scriptsFetcher).to.not.be.undefined;
    });
});

describe('validateZone', function() {
    it('should take two points, validates and returns an object', function() {
        
        let input = {
            x: 8,
            y: 8
        },
        expected = {
            valid: true,
            message: '',
            x: 8,
            y: 8
        };
        expect(roverNavigation.validateZone(input)).to.eql(expected);

        input = {
            x: 9,
            y: 9
        },
        expected = {
            valid: true,
            message: '',
            x: 9,
            y: 9
        };
        expect(roverNavigation.validateZone(input)).to.eql(expected);

    });
});

describe('validateRoverPosition', function() {
    it('should take two points and a direction, validates and returns an object', function() {
        
        let input = {
            x: 1,
            y: 1,
            d: 'N'
        },
        expected = {
            valid: true,
            message: '',
            x: 1,
            y: 1,
            d: 'N'
        };
        expect(roverNavigation.validateRoverPosition(input)).to.eql(expected);

        input = {
            x: 2,
            y: 2,
            d: 'E'
        },
        expected = {
            valid: true,
            message: '',
            x: 2,
            y: 2,
            d: 'E'
        };
        expect(roverNavigation.validateRoverPosition(input)).to.eql(expected);

    });
});

describe('validateMovement', function() {
    it('should take string, validates and returns a boolean', function() {
        
        let input = 'MMRMLMMR',
        expected = {
            valid: true,
            message: ''
        };
        expect(roverNavigation.validateMovement(input)).to.eql(expected);

        input = 'MRRMMLM',
        expected = {
            valid: true,
            message: ''
        };
        expect(roverNavigation.validateMovement(input)).to.eql(expected);

    });
});

describe('doMovement', function() {
    it('should take a movement command object return new position', function() {
        
        let input = {
            zoneBounds: {
                x: 8,
                y: 8,
            },
            currentPos: {
                x: 1,
                y: 1,
                d: 'N'
            },
            movement: 'MMRM'
        },
        expected = {
            x: 2,
            y: 3,
            d: 'E'
        };
        expect(roverNavigation.doMovement(input)).to.eql(expected);

    });
});