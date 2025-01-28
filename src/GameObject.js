 import { Vector2 } from "./Vector2";
 import { events } from "./Events";

 export class GameObject {
    constructor({ position }) {
        this.position = position ?? new Vector2(0,0);
        this.children = [];
        this.parent = null;
        this.hasReadyBeenCalled = false;
        this.isSolid = false;
        this.drawLayer = null;

    }

    // First entry point of the loop
   stepEntry(delta, root) {
    // Call updates on all children first
    this.children.forEach((child) => child.stepEntry(delta, root));

    //call ready on the first time
    if (!this.hasReadyBeenCalled) {
        this.hasReadyBeenCalled = true;
        this.ready()
    }
    // Call any implemented Step code
    this.step(delta, root);
    }
    //called before first step
    ready() {
        //
    }

    //called once every frame
    step(_delta) {
        // ...
    }

    draw(ctx, x, y) {
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;

        // Do the actual  rendering for images
        this.drawImage(ctx, drawPosX, drawPosY);

        // Pass on to children 
        this.getDrawChildrenOrdered().forEach((child => child.draw(ctx, drawPosX, drawPosY)));
    }

    getDrawChildrenOrdered() {
        return [...this.children].sort((a, b) => {
            if (b.drawLayer === "FLOOR") {
                return 1;
            }
            return a.position.y > b.position.y ? 1 : -1
        })
    }

    drawImage(ctx, drawPosX, drawPosY) {
        //...
    }

    destroy() {

        console.log(this.children)
        this.children.forEach(child => {
            child.destroy();
        })
        this.parent.removeChild(this)

    }

    addChild(gameObject) {
        gameObject.parent = this;
        this.children.push(gameObject);
    }

    removeChild(gameObject) {
        console.log("gameOject", gameObject)
        events.unsubscribe(gameObject);
        this.children = this.children.filter(g => {
            return gameObject !== g;
        })
    }


 }