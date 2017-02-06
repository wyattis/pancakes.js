# Pancakes.js
We're making pancakes! Pancakes.js is a simple 2D game engine designed to easily handle common 2D game problems including
arcade style physics, layering, I/O, states, animation and rendering. Additionally, we offer a networking client and server to make setting up multiplayer online game servers with Node.js trivially easy.


# TODO
## Dev Env
- [ ] Add minification
- [x] Add sourcemaps
- [x] Add gulp

## Engine
- [ ] TileMap
    - [ ] Load from Tiled/other tilemap editors
- [ ] Sprite
    - [ ] Enable physics method
- [ ] Scene
    - [ ] Enable physics
    - [ ] Allow video scenes
    - [ ] Allow keyframe scenes
    - [ ] Provide scripting objects for completely scripted scenes?
- [ ] Animation
    - [x] Callbacks (oncomplete, onstart, onrepeat)
- [ ] QuadTree

- [ ] Physics
    - [ ] Body
        - [x] Add friction
        - [x] Add max-velocity
        - [x] Add velocity normalization
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
- [ ] Rendering
    - [ ] Use pixi.js for dynamic layers
    - [ ] Use custom renderer with similar API for static layers???
- [ ] Input handler
    - [ ] touch
    - [ ] mouse
        - [ ] event callbacks
    - [ ] keyboard
        - [x] populate booleans (isDown, isUp, isHeld)
        - [ ] callbacks for each key
    - [ ] joystick/gamepad?
- [ ] Add canvas layers for rendering
    - [ ] a layer manages rendering for all sprites and groups associated with it
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

- [ ] Scenes
    - [ ] switching scenes
    - [ ] unloading/loading scenes