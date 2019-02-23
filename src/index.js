import * as PIXI from 'pixi.js';
import tweenManager from 'pixi-tween';

// Constants I might need later
const BASEURL = './img';
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const app = new PIXI.Application(WIDTH, HEIGHT, {
    autoResize: true,
    resolution: devicePixelRatio,
    backgroundColor: 0x1099bb
});
const container = new PIXI.Container();
const meter = new FPSMeter();

// Task 1 constants
const TOTALSPRITES = 144;

// Task 2
const TOTALTEXT = 3;
const TOTALIMAGES = 4;
const TOTALOBJECTS = TOTALTEXT + TOTALIMAGES;

// Task 3
// const TOTALSPRITES = 144;

// Add the canvas to DOM and the container to the stage
document.body.appendChild(app.view);
app.stage.addChild(container);

// Listen for window resize events
window.addEventListener('resize', resize);

// Resize function window
function resize() {
    // Resize the renderer
    app.renderer.resize(window.innerWidth, window.innerHeight);
}

// Make the container update it's children's render order
container.sortableChildren = true;

// Load assets
PIXI.loader
    .add('card', `${BASEURL}/card.png`)
    .load(onAssetsLoaded);


function onAssetsLoaded(loader, resources) {
    // You'll start the intro from here
    // c

    // Create stack of cards
    container.removeChildren();
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
        tween.from({
            x: 0,
            y: card.y
        }).to({
            x: window.innerWidth - card.width,
            y: card.y
        });
        tween.time = 2000;
        tween.delay = delayMultiplier * 1000;
        tween.on('end', () => {
            // Move to the start of the array
            // console.log(card)
            const ix = children.findIndex(child => {
                return child === card;
            });

            if (ix > -1) {
                // We remove the object from it's position and place it at the top of the stack
                children.unshift(children.pop());
                container.setChildIndex(card, delayMultiplier - 1);
            }
        });
        tween.start();
    }

    // const tween = new TWEEN()
    app.ticker.add(function (delta) {
        PIXI.tweenManager.update();
        meter.tick();
    });
}

// Wanted to figure our a way to draw emojis as text onto the canvas, but couldn't, PIXI first.
function createText() {
    container.removeChildren();
    // Create the text objects we'll use
    const texts = [];

    for (let ix = 0; ix < TOTALTEXT; ix++) {
        texts[ix] = new PIXI.Text(generateText)
    }
}
// default export Task1;