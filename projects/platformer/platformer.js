$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the drawGrid() function call below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can help you determine specific x any y values throughout the game
     * Comment the function call out to remove the grid
     */

    // drawGrid();

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)
createPlatform(950,500,150,10)
createPlatform(900,600,100,10)
createPlatform(800,700,100,10)
createPlatform(950,350,500,10)
createPlatform(1150,200,10,170)
createPlatform(1100,200,70,10)
createPlatform(700,100,300,10)
createPlatform(600,400,50,10)
createPlatform(590,110,10,300)
createPlatform(650,110,10,300)
    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)
createCollectable("database", 500, 300, 20,0.5)
createCollectable("grace", 1130, 300, 20,0.5)
createCollectable("database", 1050, 450, 20,0.5)
createCollectable("max", 1100, 170, 20,0.5)
createCollectable("database", 605, 350, 10,0.5)
    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)
createCannon("right", 250, 1000)
createCannon("right", 777, 1000)
createCannon("bottom", 770, 1000)
createCannon("bottom", 770, 1000)
createCannon("bottom", 570, 20000,1000,1000)
    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
