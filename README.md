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
    - [ ] Callbacks (oncomplete, onmid, onstart, onpercent?)
- [ ] Physics
    - [ ] Body
        - [x] Add friction
        - [ ] Add max-velocity
        - [ ] Add acceleration normalization
        - [ ] Add velocity normalization
        - [ ] Populate touching booleans
        - [ ] Add callbacks for each collision direction
    - [ ] Collision
        - [ ] Fix "stickiness" on collisions (likely due to bad determination of relative location of colliding bodies)
        - [ ] Add QuadTree to check for collision
        - [ ] Rectangle to Circle intersection
        - [ ] Rectangle to Circle collisions
        - [ ] Add memoization to momentum calculations
        - [ ] Add collision with fixed bodies
- [ ] Rendering
    - [ ] Use pixi.js for dynamic layers
    - [ ] Use custom renderer with similar API for static layers???
- [ ] Input handler
    - [ ] touch
    - [ ] mouse
    - [ ] keyboard
        - [x] populate booleans (isDown, isUp, isHeld)
        - [ ] callbacks for each key
    - [ ] joystick?
- [ ] Add canvas layers for rendering
    - [ ] a layer manages rendering for all sprites and groups associated with it
    - [x] add styles to container and canvas to make them stack correctly
    - [x] a single scene can have multiple rendering layers
    - [x] a scene has a "default" layer upon creation

## Tests
- [ ] Scenes
    - [ ] switching scenes
    - [ ] unloading/loading scenes