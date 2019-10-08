# Mars Rover navigation system

A simple program that launches a "Mars Rover" on a 2D plane and allows the user to move it around the area using simple commands. 

# How to use

First input the X and Y coordinates of the boundy of the zone in which the Mars Rover can move in. This must be a positive integer. Once this is complete you now have an area in which to move the Mars Rover.

Then you must choose a potition to launch the Mars Rover somewhere within the zone. Input an X coordinate and a Y coordinate and then also a direction that the Mars Rover will face in, North, East, South or West ('N', 'E', 'S', 'W'). The X and Y coordinates must be potitive integers. 

Once all of the above has been completed correctly you can proceed. 

Your Mars Rover is now launched on the plane. 

To move your Mars ROver around the plane, input a string command containing only 'M', 'L' or 'R' that represents the navigation. 

M = Move one space forward in the direction the Mars Rover is facing
R = Rotate 90 degrees to the right
L = Rotate 90 degrees to the left

An example of a valid navigation command is as follows: 'MMRMLMMMR'


# Additional information

I used the TDD approach when creating this application. To achieve this I used the 'Mocha' framework to test my code in the console as well as 'Chai'. My tests were written in the rover-navigation-spec.js document. to run the tests using Mocha run mocha --reporter=nyan rover-navigation-spec.js in the console. 

The code for the functions that are being tested in the spec doc can be found in the rover-navigation.js document. 

To make the app run in browser I wrote the execution function in the scripts.js document. I used Browserify to bundle my Javascript and make it able to run in the browser. 