import { GameObject } from "../../GameObject";
import { Sprite } from "../../Sprite";
import { resources } from "../../Resource";
import { Vector2 } from "../../Vector2";

export class TextBox extends GameObject {
    constructor() {
        super({
            position: new Vector2(32, 112)
        });
        this.content = "Hi, how are ya Hi, how are ya Hi, how are ya?"
        this.backdrop = new Sprite({
            resource: resources.images.textBox,
            frameSize: new Vector2(256, 64)
        })
    }

    drawImage(ctx, drawPosX, drawPosY) {
        // Draw backdrop first
        this.backdrop.drawImage(ctx, drawPosX, drawPosY)

        //now we draw text
        ctx.font = "12px fontRetroGaming";
        ctx.textAlign = "left";
        ctx.textBaseLine = "top";
        ctx.fillStyle= "#fff";

        const MAX_WIDTH = 250;
        const LINE_HEIGHT= 20;
        const PADDING_LEFT = 10;
        const PADDING_TOP = 24;

        let words = this.content.split(" ");
        let line = "";

        for (let n=0; n < words.length; n++) {
            let testLine = line + words[n] + "";
            let metrics = ctx.measureText(testLine);
            let testWidth = metrics.width;
        
            //if the test line exceeds the maximum width and it's not the first word...
            if (testWidth > MAX_WIDTH && n > 0) {
                ctx.fillText(line, drawPosX + PADDING_LEFT, drawPosY + PADDING_TOP);
                //Reset the line to the sart wit the current word.
                line = words[n] + " ";
                //mve our cursor downwards 
                drawPosY += LINE_HEIGHT;
            } else {
                line = testLine;
            }
        }

        ctx.fillText(this.content, drawPosX+PADDING_LEFT, drawPosY+PADDING_TOP)

    }
}