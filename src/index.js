import * as PIXI from 'pixi.js';
import tweenManager from 'pixi-tween';

// Constants I might need later
const TOTALSPRITES = 144;
const BASEURL = './img';
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const app = new PIXI.Application(WIDTH, HEIGHT, {
    backgroundColor: 0x1099bb
});
const container = new PIXI.Container();

// Add the canvas to DOM and the container to the stage
document.body.appendChild(app.view);
app.stage.addChild(container);

// Make the container update it's children's render order
container.sortableChildren = true;

// Load assets
PIXI.loader
    .add('card', `${BASEURL}/card.png`)
    .load(onAssetsLoaded);

// Start the update loop

// Start Intro right after
// c

// Show main menu items

// Helper functions
function onAssetsLoaded(loader, resources) {
    // You'll start the intro from here
    // c

    // Create stack of cards
    for (let ix = 0; ix < TOTALSPRITES; ix++) {
        const card = new PIXI.Sprite(resources.card.texture);
        card.scale.set(.52, .52);
        card.y = ix + 10;
        container.addChild(card);
    }
    startAnimation();
}

function startAnimation() {
    const children = container.children;

    // I do have reservations when it comes to setting all the animations at once
    for (let ix = TOTALSPRITES; ix--;) {
        const card = children[ix];
        const tween = PIXI.tweenManager.createTween(card);

        // console.log("Card:", card);
        const delayMultiplier = (TOTALSPRITES - ix);

        // Now to move the card to the right hand side of the screen
        tween.from({ x: 0, y: card.y }).to({ x: window.innerWidth - card.width, y: card.y });
        tween.time = 2000;
        tween.delay = delayMultiplier * 1000;
        tween.on('end', () => {
            // Move to the start of the array
            console.log(card)
            const ix = children.findIndex(child => {
                return child === card;
            });
            if (ix > -1) {
                // We remove the object from it's position and place it at the top of the stack
                children.unshift(children.pop());
                container.setChildIndex(card, delayMultiplier);
            }
            // card.zOrder = +card.y;
            // container.sortChildren();
            // console.log();

        });
        tween.start();
    }

    // const tween = new TWEEN()
    app.ticker.add(function(delta) {
        PIXI.tweenManager.update();
    });
}

// default export Task1;