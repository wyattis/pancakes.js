/*global Engine*/
const canvas = document.getElementById('pncks');
canvas.width = canvas.parentNode.clientWidth;
canvas.height = canvas.parentNode.clientHeight;
const ctx = canvas.getContext('2d');
const base = new Engine.Container();

const sprite = new Engine.nSprite(0, 0);
base.add(sprite);

function tick(timestamp){

    requestAnimationFrame(tick);
    base.update();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sprite.render(ctx);

    sprite.position.x += .1;
    base.setPos(base.position.x, base.position.y += .5);
    // base.position.y += .5;

}
requestAnimationFrame(tick);