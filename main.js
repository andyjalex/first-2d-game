import { resources } from './src/Resource.js';
import './style.css'
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from './src/Vector2.js';
import { GameLoop } from './src/GameLoop.js';
import { Camera } from './src/Camera.js';
import { Rod } from './src/objects/Rod/Rod.js';
import { Exit } from './src/objects/Exit/Exit.js';

import { Main } from './src/objects/Main/Main.js';

import { CaveLevel1 } from './src/levels/CaveLevel1.js';

const canvas = document.querySelector('#game-canvas')
const ctx = canvas.getContext('2d');

const mainScene = new Main({
  position: new Vector2(0,0)
})

// mainScene.setLevel(new OutdoorLevel1())

mainScene.setLevel(new CaveLevel1)


const update = (delta) => {
  //updating entities in the game

  mainScene.stepEntry(delta, mainScene)
  mainScene.input?.update()
}




  const draw = () => {

    //clear anything stale 
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

    //draw bg 
    mainScene.drawBackground(ctx);
    //save the current state (for camera offset)

    ctx.save();
    
    if (mainScene.camera) {
       //offset the camera position
      ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);
    }
   

    //Draw objects in the mounted scene

    mainScene.drawObjects(ctx)

      //Restore the original state
    ctx.restore();

    //Draw anything above game 
    mainScene.drawForeground(ctx);



  }
  

  const gameLoop = new GameLoop(update, draw)
  gameLoop.start()

  




