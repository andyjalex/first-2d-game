class Resources {
    constructor() {
        // Everything we plan to download
        this.toLoad = {
          hero: "/sprites/hero-sheet.png",
          shadow: "/sprites/shadow.png",
          rod: "/sprites/rod.png",
          exit: "/sprites/exit.png",
          //outdoor
          sky: "/sprites/sky.png",
          ground: "/sprites/ground.png",
          //cave  
          cave: "/sprites/cave.png",
          caveGround: "/sprites/cave-ground.png",
          //NPCs
          knight: "/sprites/knight-sheet.png",
          // HUD
          textBox: "/sprites/text-box.png",
          fontWhite: "/sprites/sprite-font-white.png",
          portraits: "/sprites/portraits-sheet.png"
        };

     // A bucket to keep all of our images
     this.images = {};

        //load each image 
        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
              image: img,
              isLoaded: false
            }
            img.onload = () => {
              this.images[key].isLoaded = true;
            }
          })
    }
}

export const resources = new Resources();