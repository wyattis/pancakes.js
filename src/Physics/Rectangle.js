/*global Engine*/
/**
 * Abstraction of a rectangle
 * @constructor
 * @param {float} x the x position of the top left corner of a rectangle
 * @param {float} y the y position of the top left corner of a rectangle
 * @param {float} width the width of a rectangle
 * @param {float} height the height of a rectangle
 * @returns {Engine.Rectangle} instance
 */
Engine.Rectangle = class Rectangle{

    constructor(x, y, width, height){

        this.type = Engine.RECTANGLE;
        this.width = width;
        this.height = height;
        this.setPos(x, y);

    }


    /**
     * Set the position of the Rectangle and update all of the other properties
     * related to the position.
     * @param {float} x - X position
     * @param {float} y - Y position
     */
    setPos(x, y){

        this.x = x;
        this.y = y;
        this.top = y;
        this.left = x;
        this.right = x + this.width;
        this.bottom = y + this.height;
        this.centerX = (this.left + this.right) / 2;
        this.centerY = (this.top + this.bottom) / 2;
        this.diagSqrd = this.width ^ 2 + this.height ^ 2;

    }



    /**
     * Set the size of the Rectangle and update all of the other related
     * properties.
     * @param {float} width - Width of the rectangle
     * @param {float} height - Height of the rectangle
     */
    setSize(width, height){

        this.width = width;
        this.height = height;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
        this.centerX = (this.left + this.right) / 2;
        this.centerY = (this.top + this.bottom) / 2;
        this.diagSqrd = this.width ^ 2 + this.height ^ 2;

    }

};