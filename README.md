# Pancakes.js
We're making pancakes! Pancakes.js is a simple 2D game engine designed to easily handle common 2D game problems including
arcade style physics, layering, I/O, states, animation and rendering. The goal of pancakes.js is to decouple rendering from physics/events/etc to allow for the same code base to be used on the server and client side. Additionally, we aim to offer a networking client and server to make setting up multiplayer online game servers with Node.js trivially easy.


# TODO
## Tasks
- [x] Configure documentation generation
- [ ] Document all existing Classes and methods
- [ ] Build with webpack

## Dev Env
- [x] Add babel conversion to es5
- [x] Add minification
- [x] Add sourcemaps
- [x] Add gulp

## Engine
- [ ] Game
    - [ ] Only update GUI objects when we have the game in paused state
    - [x] Add game states of playing, paused, stopped
    - [x] Keep track of requestAnimationFrame ids to cancel if necessary
- [ ] GUILayer
    - [ ] Have update method to update button positions
    - [ ] ProgressBar
        - [ ] Add update to check for changes to value
    - [ ] Button
        - [ ] Update default styles of buttons to make them prettier
        - [ ] Allow for custom button styles
        - [ ] Allow for dynamic positioning of button
        - [ ] Add update method to change positions if necessary
- [ ] Layer
    - [ ] Check for differences in the layer before rendering for "static" layers
    - [ ] Check if sprites are within the viewport before rendering
- [ ] Vector
    - [x] Normalize
    - [x] Magnitude
- [ ] Tweens
    - [ ] Central tween "registry" for scene
    - [ ] Update the tweens with each update loop
    - [ ] Remove tweens when they've reached their desired state
    - [ ] Tween any properties on any referenced object
- [ ] Camera
    - [x] follow any single body
    - [ ] frame viewport around any number of bodies
    - [ ] follow box around Body
    - [ ] moveToXY method
    - [ ] moveToBody method
    - [x] allow for "tweening" positions
- [ ] TileMap
    - [ ] Load from Tiled JSON format
    - [ ] Tiled layers are Layers in the Scene
- [ ] Group
    - [x] enablePhysics()
    - [x] collidesWith()
    - [ ] add
        - [x] animation
        - [x] image
        - [ ] sound
    - [ ] on(event) // callbacks
- [ ] Sprite
    - [x] Enable physics method
    - [x] Collides with method
    - [ ] on(event) // callbacks
- [ ] World
    - [x] Enable physics method
- [ ] Scene
    - [x] Add World
    - [ ] Force manual creation of all layers or have option to not create default layer???
    - [ ] Allow video scenes
    - [ ] Allow keyframe scenes
    - [ ] Provide scripting objects for completely scripted scenes?
    - [x] Allow for GUI based menu scenes
- [ ] Animation
    - [ ] Central animation registry in the scene???
    - [x] Callbacks (oncomplete, onstart, onrepeat)
- [ ] QuadTree

- [ ] Physics
    - [x] Allow bodies to specify which other bodies they collide with
    - [ ] Body
        - [x] Add friction
        - [x] Add max-velocity
        - [x] Add velocity normalization
        - [x] Add gravity
        - [ ] Populate touching booleans
        - [ ] Add callbacks for each collision direction
        - [x] Convert to Vectors for holding values
    - [ ] Collision
        - [ ] Fix "stickiness" on collisions
        - [ ] Use QuadTree to minimize collision checks
        - [ ] Rectangle to Circle intersection
        - [ ] Rectangle to Circle collisions
        - [ ] Add memoization to momentum calculations
        - [ ] Add fixed body collision
- [ ] Input handler
    - [ ] touch
    - [x] mouse
        - [x] event callbacks
    - [ ] keyboard
        - [x] populate booleans (isDown, isUp, isHeld)
        - [ ] callbacks for each key
    - [ ] joystick/gamepad?
- [ ] Add canvas layers for rendering
    - [ ] allow for less frequent updates of a canvas layer
    - [x] a layer manages rendering for all sprites and groups associated with it
    - [x] add styles to container and canvas to make them stack correctly
    - [x] a single scene can have multiple rendering layers
    - [x] a scene has a "default" layer upon creation


## Computer Controlled Characters
- [ ] Specify movement types for character
- [ ] Move towards obj function
- [ ] "react" callbacks to react to different types of objects within a certain distance of character

## Network
- [ ] P2P???
    - [ ] 2 player???
    - [ ] Multiplayer P2P???
- [ ] Client
    - [ ] Interpolate
    - [ ] Correct discrepancies between server and client
- [ ] Server
    - [ ] loop
    - [ ] handle aggregating inputs
    - [ ] record states of game

## Tests
- [ ] Events
    - [ ] all collision events
    - [ ] all animation events

- [x] Scenes
    - [x] switching scenes
    - [x] unloading/loading scenes