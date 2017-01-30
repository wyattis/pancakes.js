# Pancakes.js
We're making pancakes! Pancakes.js is a simple 2D game engine designed to easily handle common 2D game problems including
arcade style physics, layering, I/O, states, animation and rendering. Additionally, we offer a networking client and server to make setting up multiplayer online game servers with Node.js trivially easy.


# TODO
## Dev Env
- [x] Add sourcemaps
- [x] Add gulp

## Engine
- [ ] Input handler
    - [ ] mouse
    - [ ] keyboard
    - [ ] joystick?
- [ ] Add canvas layers for rendering
    - [ ] a layer manages rendering for all sprites and groups associated with it
    - [x] a single scene can have multiple rendering layers
    - [x] a scene has a "default" layer upon creation