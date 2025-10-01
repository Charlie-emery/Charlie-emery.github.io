/*
 * TODO 4: Create a modularized index.js, 
 * pass in window and createjs
 */
(function(window, createjs) {
  // TODO 5: Initialize CreateJS //
  const canvas = document.getElementById("canvas")
  const stage = new createjs.Stage(canvas);
  var speedL = 1;
  var speedR = -1;
  var speedY = -1
  // TODO 6: Set the framerate of the Ticker
  createjs.Ticker.framerate = 60


  /*
   * TODO 7:CREATE AND CONFIGURE ANY DISPLAY 
   * OBJECTS AND ADD THEM TO THE DISPLAY LIST HERE
   */
  
  // INIT CREATEJS //

  

    
  // CREATE A BACKGROUND //
const bg = new createjs.Shape()
    bg.graphics.beginFill("rgba(255, 255, 255, 1)").drawCircle(300, 300, 270)
  // CREATE A CIRCLE //
  const shirt = new createjs.Shape()
shirt.graphics.beginFill("rgba(187, 0, 255, 1)").drawCircle(300, 700, 300 )

  const hair = new createjs.Shape();
hair.graphics.beginFill("rgba(90, 173, 12, 1)").drawCircle(60, 50, 50)
hair.scaleX = 5
hair.scaleY = 2

const eyeContainer = new createjs.Container();
eyeContainer.x = 150
eyeContainer.y= 200
const leftP = new createjs.Shape();
const rightP = new createjs.Shape();
const leftEye = new createjs.Shape();
const rightEye = new createjs.Shape();
const leftM = new createjs.Shape();
const rightM = new createjs.Shape();

leftP.graphics.beginFill("rgba(0, 0, 0, 1)").drawCircle(35, 25, 15)
rightP.graphics.beginFill("rgba(0, 0, 0, 1)").drawCircle(240, 25, 15)
leftEye.graphics.beginFill("rgba(255, 255, 255, 1)").drawCircle(25, 50, 35)
leftEye.scaleY= 0.5
rightEye.graphics.beginFill("rgba(255, 255, 255, 1)").drawCircle(250, 50, 35)
rightEye.scaleY= 0.5
leftM.graphics.beginFill("rgba(0, 0, 0, 1)").drawCircle(25, 25, 60)
rightM.graphics.beginFill("rgba(0, 0, 0, 1)").drawCircle(250, 25, 60)

const ls = new createjs.Container();
const lipstick = new createjs.Shape();
const wing1 = new createjs.Shape();
const wing2 = new createjs.Shape();

lipstick.graphics.beginFill("rgba(255, 0, 0, 1)").drawCircle(75, 410, 50)
lipstick.scaleX = 4
lipstick.scaleY = 1.1
wing1.graphics.beginFill("rgba(255, 0, 0, 1)").drawCircle(320, 830, 50)
wing1.scaleX = 2
wing1.skewY = -40
wing2.graphics.beginFill("rgba(255, 0, 0, 1)").drawCircle(70, 330, 50)
wing2.scaleX = 2
wing2.skewY = 40

const mc = new createjs.Container()
const mouth = new createjs.Shape();
const top = new createjs.Shape();
const lip = new createjs.Shape();

mouth.graphics.beginFill("rgba(0, 0, 0, 1)").drawCircle(100, 450, 50)
mouth.scaleX = 3
lip.graphics.beginFill("rgba(255, 255, 255, 1)").drawCircle(100, 411, 50)
lip.scaleX = 3
top.graphics.beginFill("rgba(255, 0, 0, 1)").drawCircle(100, 420, 50)
top.scaleX = 3
  




  // ADD DISPLAY OBJECTS TO STAGE //
  ls.addChild(lipstick, wing1, wing2)
  mc.addChild(mouth, top, lip)
  eyeContainer.addChild(leftM, rightM, leftEye, rightEye, leftP, rightP )
  
stage.addChild(shirt, hair, bg, eyeContainer, ls, mc)


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
    leftM.x += speedL
    leftEye.x += speedL
    leftP.x += speedL
     rightM.x += speedR
    rightEye.x += speedR
    rightP.x += speedR
    
    if (leftEye.x >= 220){
     speedL = -speedL
   }
   if(leftEye.x < 0){
  
  speedL = -speedL  
  }
    if (rightEye.x <= -220){
     speedR = -speedR
   }
   if(rightEye.x > 0){
  
  speedR = -speedR
  }
   
    
    stage.update();ghg
  }
  

}(window, window.createjs));
