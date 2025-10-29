(function (window, _) {
  window.jeuxBulb = window.jeuxBulb || {
    numz: {
      calculateDistance(p1, p2) {
        var a = Math.abs(p1.x - p2.x)
        var b = Math.abs(p1.y - p2.y)
        var c = Math.pow(a, 2) + Math.pow(b, 2)
        return Math.sqrt(c);
      },
      getAngleDegrees(pointA, pointB) {
        const distansX = pointB.x - pointA.x
        const distansY = pointB.y - pointA.y
        const radians = Math.atan2(distansY, distansX)
        const degrees = radians * 180 / Math.PI
        return degrees
      }
    },
    phyz: {},
  };

}(window, window._));