(function(window, opspark, racket) {
  /**
   * Creates and returns the space module. Listens for SPAWN 
   * events, adding any bodies in the event
   * @param {Object} messenger: The system wide event dispatcher.
   */
  opspark.space = function(messenger) {
    // holds all bodies active in our space //
    const 
      dampeningForce = 0.04,
      active = [];

    messenger.on('SPAWN', onSpawn);
    function onSpawn(event) {
      add(...event.bodies);
    }
    
    function add(...bodies) {
      active.push(...bodies);
      return this;
    }

    function remove(body) {
      return active.splice(active.indexOf(body), 1)[0];
    }

    return {
      add,
      remove,
      destroy() {
        messenger.off('SPAWN', onSpawn);
      },
      update(event) {
        active.forEach(body => {
          // ask the body to update its velocity //
          body.update(event);
          
          // update the body's position based on its new velocity //
          racket.physikz.updatePosition(body);
        });

        // loop backwards over each body in the space: note i > 0 //
        for (let i = active.length - 1; i > 0; i--) {
          // pull out each body one by one //
          const bodyA = active[i];

          // compare all other bodies to bodyA, excluding bodyA: note j > -1 //
          hit: for (let j = i - 1; j > -1; j--) {
            const bodyB = active[j];
            
            // TODO 1: Calculate hit test components
            let distanceX = Math.abs(bodyA.x - bodyB.x);
            let distanceY = Math.abs(bodyA.y - bodyB.y);
            let distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
            let minimumDistance = bodyA.radius + bodyB.radius
            if (bodyA.velocityX > 10){
              bodyA.velocityX = 10
            } else if (bodyA.velocityX < -10){
              bodyA.velocityX = -10
            }
            if (bodyA.velocityY > 10){
              bodyA.velocityY = 10
            } else if (bodyA.velocityY < -10){
              bodyA.velocityY = -10
            }
              if (bodyB.velocityX > 10){
              bodyB.velocityX = 10
            } else if (bodyB.velocityX < -10){
              bodyB.velocityX = -10
            }
             if (bodyB.velocityY > 10){
              bodyB.velocityY = 10
            } else if (bodyB.velocityY < -10){
              bodyB.velocityY = -10
            } 
            // TODO 2: Do collision check: how do we know if bodies are colliding?
            if(distance < minimumDistance) {
              
              
              // TODO 3: Calculate springToX and springToY 
             let angle = Math.atan2(distanceX, distanceY)
              let springToX = bodyA.x + (Math.cos(angle) * minimumDistance)
              let springToY = bodyA.y + (Math.sin(angle) * minimumDistance)
                
              // TODO 4: Calculate acceleration to spring-to point, factor in dampeningForce
              let accelerationOnX = (bodyB.x - springToX) * dampeningForce
              let accelerationOnY = (bodyB.y - springToY) * dampeningForce
              
              // TODO 5: Apply acceleration to bodyB
              bodyB.velocityX = bodyB.velocityX + accelerationOnX
              bodyB.velocityY = bodyB.velocityY + accelerationOnY
              
              
              // TODO 6: Apply inverse acceleration to bodyA
              bodyA.velocityX = bodyA.velocityX - accelerationOnX
              bodyA.velocityY = bodyA.velocityY - accelerationOnY

              
              
            }
          }
        }
      }
    };
  };
}(window, window.opspark, window.opspark.racket));
