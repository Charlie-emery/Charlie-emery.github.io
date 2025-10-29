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
        const distanceX = pointB.x - pointA.x
        const distanceY = pointB.y - pointA.y
        const radians = Math.atan2(distanceY, distanceX)
        const degrees = radians * 180 / Math.PI
        return degrees
      },
      degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
      },
      radiansToDegrees(radians) {
        return radians * 180 / Math.PI;
      },
    },
    phyz: {
      updatePosition(body) {
        body.x += body.velocityX;
        body.y += body.velocityY;
        body.rotation += body.rotationalVelocity;
      }, updateVelocity(body, forceOnX, forceOnY) {
        const
          angle = body.rotation * Math.PI / 180,
          accelerationOnX = Math.cos(angle) * forceOnX,
          accelerationOnY = Math.sin(angle) * forceOnY;
        body.velocityX += accelerationOnX;
        body.velocityY += accelerationOnY;
      }, makeBody: function (type, {
        velocityX = 0,
        velocityY = 0,
        rotationalVelocity = 0,
        integrity = 1,
        density = 1,
        volatility = 0
      } = {}) {
        if (type === undefined) throw new Error('You must provide a valid String for the type parameter!');
        return {
          type: type,
          velocityX: velocityX,
          velocityY: velocityY,
          rotationalVelocity: rotationalVelocity,
          integrity: integrity,
          density: density,
          volatility: volatility,

          /**
           * @param {Number} A number representing the force of the impact.
           * @param {Object} The other body involved in the collision.
           */
          handleCollision(impact, body) {
            // template method //
          },

          /**
           * Can be overridden in the concrete body to provide a custom update()
           * method.
           */
          update(event) {
            // template method //
          }
        };
      },
    },
  };

}(window, window._));