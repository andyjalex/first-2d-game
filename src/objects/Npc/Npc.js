import { GameObject } from "../../GameObject";
import { Vector2 } from "../../Vector2";
import { Sprite } from "../../Sprite";
import { resources } from "../../Resource";
import { storyFlags } from "../../StoryFlags";


export class Npc extends GameObject {
    constructor(x, y, textConfig ={}) {
        super({
            position: new Vector2(x, y)
        });
        

        console.log(textConfig)
        // Opt into being solid 
        this.isSolid = true;

        //say something when talking
        this.textContent = textConfig.content;
        this.textPortraitFrame = textConfig.portraitFrame;

        //shadow under feet
        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32, 32), 
            position: new Vector2(-8, -19)
        })
        this.addChild(shadow);

        //Body sprite 
        const body = new Sprite({
            resource: resources.images.knight,
            frameSize: new Vector2(32, 32), 
            hFrames: 2,
            vFrames: 1,
            position: new Vector2(-8,-20)
        })

        this.addChild(body)
    }

    getContent() {

        // Maybe expand with story flag logic, etc
        const match = storyFlags.getRelevantScenario(this.textContent);
        if (!match) {
            console.warn("No matches found in the liasy!", this.textContent);
            return null;
        }
        
        console.log(match)
        return {
            portraitFrame: this.textPortraitFrame,
            string: match.string,
            addsFlag: match.addsFlag ?? null
        }
    }
}