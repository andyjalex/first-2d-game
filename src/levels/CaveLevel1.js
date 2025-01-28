import { Vector2 } from "../Vector2";
import { resources } from "../Resource";
import { Level } from "../objects/Level/Level";
import { Sprite } from "../Sprite";
import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { Rod } from "../objects/Rod/Rod";
import { events } from "../Events";
import { OutdoorLevel1 } from "./OutdoorLevel1";
import { Npc } from "../objects/Npc/Npc";
import { TALKED_TO_A, TALKED_TO_B } from "../StoryFlags";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5))

export class CaveLevel1 extends Level {
    constructor(params={}) {
        super({});

        this.background = new Sprite({
            resource: resources.images.cave, 
            frameSize: new Vector2(320, 180)
        })

        const ground = new Sprite({
            resource: resources.images.caveGround,
            frameSize: new Vector2(320,180)
        })

        this.addChild(ground)

        const exit = new Exit(gridCells(3), gridCells(5))
        this.addChild(exit)

        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;
        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero)

        const rod = new Rod(gridCells(9), gridCells(6));
        this.addChild(rod)

        const npc1 = new Npc(gridCells(5), gridCells(5), {
            //content: "I am the first NPC!",
            content: [
                {
                    string: "I can't stand that guy",
                    requires: [TALKED_TO_B],   
                    bypass: [TALKED_TO_A],
                    addsFlag: TALKED_TO_A,                   
                },
                {
                    string: "He is just the worst!.",
                    requires: [TALKED_TO_A],
                },
                {
                    string: "Grumble grumble. another day at work",
                    requires: [],
                }
            ],
            portraitFrame: 1
        })
        this.addChild(npc1)

        const npc2 = new Npc(gridCells(8), gridCells(5), {
            content: [
                {
                    string: "What a wonderful day at wokr in the cave",
                    requires: [],   
                    addsFlag: TALKED_TO_B                   
                }
            ],
            portraitFrame: 0
        })
        this.addChild(npc2)

        this.walls = new Set();

        // this.walls.add(`64,48`); // tree
        
        // this.walls.add(`64,64`); // squares
        // this.walls.add(`64,80`);
        // this.walls.add(`80,64`);
        // this.walls.add(`80,80`);
        
        // this.walls.add(`112,80`); // water
        // this.walls.add(`128,80`);
        // this.walls.add(`144,80`);
        // this.walls.add(`160,80`);

    }

    ready() {

        events.on("HERO_EXITS", this, () => {
            events.emit("CHANGE_LEVEL", new OutdoorLevel1({
                heroPosition: new Vector2(gridCells(6), gridCells(4))
            }))
        })
    }
}