/*global Engine*/
Engine.Vector = class Vector{

    constructor(x, y){

        this.x = x;
        this.y = y;

    }


    /**
     * Return the magnitude of a vector
     */
    mag(){

        return Math.sqrt(this.x * this.x + this.y * this.y);

    }


    /**
     * Will draw an arrow representing the vector
     */
    draw(fromPos, ctx){

        if(this.x === 0 && this.y === 0)
            return;
        let fromx = fromPos.x;
        let fromy = fromPos.y;
        let tox = fromPos.x + this.x;
        let toy = fromPos.y + this.y;


        var headlen = 5;
        var angle = Math.atan2(toy-fromy,tox-fromx);

        //starting path of the arrow from the start square to the end square and drawing the stroke
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.lineWidth = 2;
        ctx.stroke();

        //starting a new path from the head of the arrow to one of the sides of the point
        ctx.beginPath();
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

        //path from the side point of the arrow, to the other side point
        ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

        //path from the side point back to the tip of the arrow, and then again to the opposite side point
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

        //draws the paths created above
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fill();


    }

};