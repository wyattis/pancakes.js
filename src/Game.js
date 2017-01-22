class Game{

    constructor(engine){

        this.engine = engine;

		this.play = new ScreenManager(this);
		this.add = this.play.add;

        // this.ticker = new Ticker();

    }


    loop(update, render){

        const tick = (timestamp) => {

            requestAnimationFrame(tick);

            const delta = timestamp - this.lastTimestamp;

            update(delta);
            render(delta);

            this.lastTimestamp = timestamp;
        };

        this.lastTimestamp = performance.now();
        requestAnimationFrame(tick);
    }

}