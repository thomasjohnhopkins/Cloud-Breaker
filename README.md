# CloudBreaker
CloudBreaker ([live](http://www.better-sounds.com)) is a browser game inspired by Brick Breaker. Gone are the bricks and ball, in clouds and the sun.
Use the sun to break up the clouds and enjoy the clear blue sky. The game's background is a photo taken at the end of the Angel's Landing trail in Zion National Park, a trail highly recommended by the creator of this game.

## Features
 - Game logic written in JavaScript, rendered in HTML5 Canvas
 - jQuery utilized to enable canvas to communicate with game clock and scoreboard
 - Deploys webpack to bundle the various game modules
 - Tracks object collisions through the use of two different collision-detection algorithms, one for the sun hitting the paddle or wall, another for collisions with clouds.
 - Collision detection algorithm for paddle gives sun omnidirectional movement and varying speed.
