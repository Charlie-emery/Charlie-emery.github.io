/*
 * TODO 4: Create a modularized index.js, 
 * pass in window and createjs
 */
(function(window, createjs) {
  // TODO 5: Initialize CreateJS //
  const canvas = document.getElementById("canvas")
  const stage = new createjs.Stage(canvas);

  // TODO 6: Set the framerate of the Ticker
  createjs.Ticker.framerate = 60


  /*
   * TODO 7:CREATE AND CONFIGURE ANY DISPLAY 
   * OBJECTS AND ADD THEM TO THE DISPLAY LIST HERE
   */
  
  // INIT CREATEJS //

  

    
  // CREATE A BACKGROUND //
const bg = new createjs.Shape()
    bg.graphics.beginFill("#F00").drawCircle(250, 250, 270)
  // CREATE A CIRCLE //
const eyeContainer = new createjs.Container();
eyeContainer.x = 150
eyeContainer.y= 150
const leftEye = new createjs.Shape();
const rightEye = new createjs.Shape();

leftEye.graphics.beginFill("rgba(0, 68, 255, 1)").drawRect(25, 25, 60, 10)
rightEye.graphics.beginFill("rgba(255, 213, 0, 1)").drawCircle(200, 25, 25)

const mc = new createjs.Container()
const mouth = new createjs.Shape();
const lip = new createjs.Shape();
mouth.graphics.beginFill("rgba(0, 0, 0, 1)").drawCircle(80, 400, 50)
mouth.scaleX = 3
mouth.graphics.beginFill("rgba(255, 0, 0, 1)").drawCircle(80, 370, 50)
mouth.scaleX = 3
  


  // ADD DISPLAY OBJECTS TO STAGE //
  mc.addChild(mouth, lip)
  eyeContainer.addChild(leftEye, rightEye)
stage.addChild(bg, eyeContainer, mc)


stage.update()
  // TODO 8: Listen to the 'tick' event  //
  
  let tickHandler = createjs.Ticker.on("tick", onTick)

  // TODO 9: Handle the 'tick' event //
  function onTick(event){
    update(event)
  }
  

  /*
   * TODO 10: Implement an update Function, after making 
   * changes to assets, it must call stage.update(); 
   */
  function update(event){
    
    
   if (leftEye.x <=200){
    leftEye.x++
   }else{
    while(leftEye.x >= 25){
      leftEye.x = leftEye - 0.1
    }
   }
    stage.update();
  }
  

}(window, window.createjs));
