# Refractor Plan
## Game
	Game handles the overall state, the main loop, user input and the current scene.
	### state
	States should be STOPPED, PLAYING, PAUSED for the game. When the game is paused UI based components should still update and render.
	### Loop
	Should handle failures and be able to skip frames if the updates are taking too long

## Scene
	Creates the relationship between the game and the rendering. The scene must have a camera, at least one rendering layer and optionally have a "Container" and physics object. Layers can be one of 3 types: GUI, Video, and game.


	### Container
	Containers hold sprites and other containers. Each member is positioned relative to the parent container. This can be updated recursively.


	### Sprite
	Holds the information related to rendering of a Sprite: relative position, renderMethod, real position, angle, and scale.


	### Collider
	Holds the information that is used by the physics engine. Can share properties with a Sprite: position, scale, and angle.


## GUI
	
	### ProgressBar
	The default rendering style for this will be to just crop an image based on the current progress of the bar. The alternative will be to override the render method with whatever type of rendering you want to do.

	### Text
	Can be optimized by only rendering raw text when there are changes to the text. Otherwise a cached version should be used


# Old Info
Engine
	game(opts)

	Game
		constructor(engine, container)
		container					// html element to create each canvas
		add
			screen(name)			// add a screen to the list of possible screens
		play
			screen(name)			// cleans up a previous screen before initializing the next one

	Screen
		constructor(callbacks)
		init()						// Handles the creation of canvas layers needed for the screen
		load(cacheKey, url)
		update(delta)
		render(delta)				// renders each layer in the screen
		add
			spritesheet(name, cacheKey, tileWidth, tileHeight)
			layer()					// creates a new canvas layer

	Layer
		scale			// holds matrix for scaling the screen
		ctx 			// holds the canvas context
		depth			// controls how far away from the viewport the layer appears to be
		constructor()	// creates a new canvas as a layer
		render()
	 	add
	 		sprite(cacheKey, x, y)
	 		group()

	Group
		children
		pos								// Collision and rendering could be done relative to this position
		constructor(parentLayer)
		add([child|children])
		collidesWith([group|sprite])
		render(ctx)

	Sprite
		body
		constructor(parentLayer)
		collidesWith([sprite|group])
		add
			animation(name, spritesheetName, frames, totalTime, opts)
			image(name, cacheKey)
			sound(name, cacheKey)
		play
			animation(name)
			sound(name)


	Animation
		constructor(spritesheetKey, frames, totalTime, infinite)
		update(delta)
		play()
		stop()
		onFinish(cb)
		onRepeat(cb)

	Spritesheet
		constructor(cacheKey, tileWidth, tileHeight, tilePadding)

	Button
		constructor(onHover, onClick, onDown, onUp)

	Input	// handle events on the container and pass through to appropriate layer

============================================
Private stuffs
============================================
	Body
		pos
		vel
		acc
		angle???
		dAngle???
		ddAngle???
		geometry/shape
		touching
			left
			right
			top
			bottom
		update(delta)

	Physics
		constructor()
		add(body)
		tick(delta)

	Geometry
		rectRectIntersect(A, B)
		rectCircleIntersect(R, C)
		circleCircleIntersect(A, B)

	Collision
		rectRectCollision(A, B)
		rectCircleCollision(rect, circ)
		elasticCollision1D(v1i, m1, v2i, m2)
		elasticCollision2D(v1i, m1, v2i, m2)

	Rectangle
		width
		height
		x
		y
		left
		right
		top
		bottom
		centerX
		centerY
		constructor(x, y, w, h)
		setPos(x, y)

	Circle
		radius
		centerX
		centerY
		setPos(x, y)

	Cache
		add(key, obj)
		use(key)

	AssetManager
		load(cacheKey, url)
		go(progressCB, finishedCB)

	ObjectFactory
		sprite
		spritesheet
		group

	C
		static random
		static randomInt
		static range(min, max) => [min, ..., max]


	TileSheet(spritesheetName, numCols, numRows)

	Render

	QuadTree