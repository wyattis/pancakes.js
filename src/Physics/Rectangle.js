class Rectangle{

    constructor(x, y, width, height){

        this.width = width;
        this.height = height;
        this.setPos(x, y);

    }

    setPos(x, y){

        this.x = x;
        this.y = y;
        this.top = y;
        this.left = x;
        this.right = x + this.width;
        this.bottom = y + this.height;
        this.centerX = (this.left + this.right) / 2;
        this.centerY = (this.top + this.bottom) / 2;

    }

}