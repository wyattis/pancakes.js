"use strict";
class Ticker{

	constructor(){

		this.cbs = [];
		this.contexts = [];
		this.intervals = [];
		this.timeSinceLastCalled = [];
		this.isRunning = [];

	}

	add(context, cb, interval){

		this.contexts.push(context);
		this.cbs.push(cb);
		this.intervals.push(interval);
		this.timeSinceLastCalled.push(0);
		this.isRunning.push(true);

		// Return the index for further manipulation
		return this.cbs.length;
	}

	tick(delta){

		// console.log(delta);
		for(let i=0; i < this.timeSinceLastCalled.length; i++){

			// Don't update if the callback isn't enabled
			if(!this.isRunning[i]) continue;

			// Increment the time that has passed
			this.timeSinceLastCalled[i] += delta;


			let timeSinceLastCalled = this.timeSinceLastCalled[i];
			let interval = this.intervals[i];

			// If we're at or past our desired interval time, then
			// the callback is fired.
			if(timeSinceLastCalled >= interval){

				this.cbs[i].call(this.contexts[i], timeSinceLastCalled);
				// this.timeSinceLastCalled[i] = timeSinceLastCalled % interval;
				this.timeSinceLastCalled[i] = 0;

			}

		}

	}

	loop(timestamp){

		requestAnimationFrame(this.loop.bind(this));

		let deltaT = timestamp - this.lastTimestamp;
		this.tick(deltaT);
		this.lastTimestamp = timestamp;

	}

	start(){

		this.lastTimestamp = performance.now();
		requestAnimationFrame(this.loop.bind(this));

	}

	disable(index){

		this.isRunning[index] = false;

	}

	enable(index){

		this.timeSinceLastCalled[index] = 0;
		this.isRunning[index] = true;

	}
	
	reset(){
		
		this.cbs = [];
		this.contexts = [];
		this.intervals = [];
		this.timeSinceLastCalled = [];
		this.isRunning = [];
		
	}

}