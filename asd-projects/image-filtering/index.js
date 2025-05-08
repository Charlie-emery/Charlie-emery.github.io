// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  smudge()
  
  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      console.log(image[i][j-1])
      var rgbString = image[i][j]
      var rgbNumbers = rgbStringToArray(rgbString)
      filterFunction(rgbNumbers)
      rgbString = rgbArrayToString(rgbNumbers)
      image[i][j] = rgbString
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
  background = image[0][0]
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      var rgbString = image[i][j]
      if (rgbString !== background){
      var rgbNumbers = rgbStringToArray(rgbString)
      filterFunction(rgbNumbers)
      rgbString = rgbArrayToString(rgbNumbers)
      image[i][j] = rgbString}
      
    }
  }
}
// TODO 5: Create the keepInBounds function
function keepInBounds(num) {
  num = num < 0 ? 0 : num
  num = num > 255 ? 255 : num
  return num
}

// TODO 3: Create reddify function
function reddify(arr) {
  arr[RED] = 200
  
}
// TODO 6: Create more filter functions
function decreaseBlue(arr){
  arr[BLUE] = keepInBounds(arr[BLUE] - 50)
}
function increaseGreenByBlue(arr){
  arr[GREEN] = keepInBounds(arr[BLUE] + arr[GREEN])
}
// CHALLENGE code goes below here
function smudge(){
  for (let i = 0; i < image.length; i++) {
    for (let j = image[i].length - 1;j > 0 ; j--) {
      var rgbString = image[i][j]
      var leftrgbString = image[i][j - 1]
      if (j === 0){
        var lastRGBString = image[i][j]
      } else{ lastRGBString = image[i][j - 1]}
      
      var rgbNumbers = rgbStringToArray(rgbString)
      var lastRGBNumbers = rgbStringToArray(leftrgbString)
      rgbNumbers[RED] = (lastRGBNumbers[RED] + rgbNumbers[RED]) / 2
      rgbNumbers[BLUE] = (lastRGBNumbers[BLUE] + rgbNumbers[BLUE]) / 2
      rgbNumbers[GREEN] = (lastRGBNumbers[GREEN] + rgbNumbers[GREEN]) / 2
      rgbString = rgbArrayToString(rgbNumbers)
      image[i][j] = rgbString
    }
  }
}
