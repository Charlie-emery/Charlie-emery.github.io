/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W: 87,
    A: 65,
    S: 83,
    D: 68
  };
  var walker = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
  };
  var walker2 = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
  }
  // Game Item Objects

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown); // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision(walker);
    wallCollision(walker2);
    redrawGameItem();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    console.log(event.which);
    if (event.which === KEY.UP) {
      walker.speedY = -5;
    }
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    }
    if (event.which === KEY.DOWN) {
      walker.speedY = 5;
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    }
    if (event.which === KEY.W) {
      walker2.speedY = -5;
    }
    if (event.which === KEY.A) {
      walker2.speedX = -5;
    }
    if (event.which === KEY.S) {
      walker2.speedY = 5;
    }
    if (event.which === KEY.D) {
      walker2.speedX = 5;
    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.UP) {
      walker.speedY = 0;
    }
    if (event.which === KEY.LEFT) {
      walker.speedX = 0;
    }
    if (event.which === KEY.DOWN) {
      walker.speedY = 0;
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 0;
    }
    if (event.which === KEY.W) {
      walker2.speedY = 0;
    }
    if (event.which === KEY.A) {
      walker2.speedX = 0;
    }
    if (event.which === KEY.S) {
      walker2.speedY = 0;
    }
    if (event.which === KEY.D) {
      walker2.speedX = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function repositionGameItem() {
    walker.positionX += walker.speedX;
    walker.positionY += walker.speedY;
    walker2.positionX += walker2.speedX;
    walker2.positionY += walker2.speedY;
  }
  function redrawGameItem() {
    $("#walker").css("left", walker.positionX);
    $("#walker").css("top", walker.positionY);
    $("#walker2").css("left", walker2.positionX);
    $("#walker2").css("top", walker2.positionY);
  }
  function wallCollision(walker) {
    if (walker.positionX <= 0) {
      walker.positionX = 0
    }
    if (walker.positionY <= 0) {
      walker.positionY = 0
    }
    if ($("#board").width() < walker.positionX + 50){
      walker.positionX = $("#board").width() -50
    }
    if ($("#board").height() < walker.positionY + 50){
      walker.positionY = $("#board").height() -50
    }
    
  }
}
