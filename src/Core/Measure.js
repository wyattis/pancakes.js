export class Measure {

    constructor() {

        this.measurements = {};

    }


    add(name) {

        this.measurements[name] = new Measurement();

    }


    begin(name) {

        if (!this.measurements[name])
            this.add(name);
        this.measurements[name].begin();

    }

    end(name) {

        this.measurements[name].end();

    }

    log(name, frequency) {

        this.measurements[name].log(name, frequency);

    }

}


export class Measurement {

    constructor() {

        this.sum = 0;
        this.values = [];
        this.count = 0;
        this.startTime;
        this.endTime;

    }


    begin() {

        this.startTime = performance.now();

    }

    end() {

        this.endTime = performance.now();
        this.sum += this.endTime - this.startTime;
        this.values.push(this.endTime - this.startTime);
        this.count++;

    }

    log(name, frequency) {

        if (this.count % frequency === 0)
            console.log(`${name} - Full Average: ${this.sum/this.count}, Average of last 10: ${this.values.slice(-10).reduce((a, v)=>a + v)/10}`);

    }

}


export default Measure;