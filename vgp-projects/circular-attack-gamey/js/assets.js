(function (window, opspark, _) {
  const Proton = window.Proton,
    draw = opspark.draw,
    phyz = opspark.racket.physikz,
    numz = opspark.racket.num;

  /**
   * Takes a body and centers its x and y on the canvas.
   * @param {Object} asset: A body with an x and y property.
   * @param {Canvas} canvas: The HTML canvas element.
   */
  function centerOnStage(asset, canvas, level) {
    if (asset.type === "circular" || asset.radius) {
      asset.x = canvas.width / 2;
      asset.y = canvas.height / 2;
    } else {
      const bounds = asset.getBounds();
      asset.x = (canvas.width - bounds.width) / 2;
      asset.y = (canvas.height - bounds.width) / 2;
    }
  }

  function getProjectilePoint() {
    return this.localToGlobal(this.radius + 10, 0);
  }

  function getExhaustPoint() {
    return this.localToGlobal(-(this.radius + 10), 0);
  }

  /**
   * Creates an API at opspark.assets to
   * build and work with visual assets.
   *
   * @param {Object} canvas: The canvas on which the
   * game is drawn, used for incept positioning of assets.
   */
  _.set(opspark, "playa.assets", function (canvas, fx, level) {
    // ASSET BEHAVIORS //
    function updateShip(event) {
      phyz.updateVelocity(this, this.propulsion, this.propulsion);
      phyz.reboundCircularAssetInArea(this, canvas);
    }

    function updateOrb(event) {
      phyz.updateVelocity(this, 0, 0);
      phyz.reboundCircularAssetInArea(this, canvas);
    }
    
    function updatePariPowerUp(event) {
      phyz.updateVelocity(this, 0, 0);
      phyz.reboundCircularAssetInArea(this, canvas);
    }
    function updateLaserPower(event) {
      phyz.updateVelocity(this, 0, 0);
      phyz.reboundCircularAssetInArea(this, canvas);
    }
    function updateFreezePower(event) {
      phyz.updateVelocity(this, 0, 0);
      phyz.reboundCircularAssetInArea(this, canvas);
    }

    function updateProjectile(impact) {
      phyz.reboundCircularAssetInArea(this, canvas);
    }

    /**
     * Each method draws and assembles the asset in a
     * default state, assigning its update method.
     */
    return {
      makeProjectile() {
        const projectile = _.extend(
          draw.circle(5, "#ff0000"),
          phyz.makeBody("projectile")
        );

        // TODO : get from settings JSON //
        projectile.volatility = 0.125;
        projectile.velocityMax = 10;
        projectile.update = updateProjectile;

        projectile.snapToPixel = true;
        projectile.cache(
          -projectile.radius,
          -projectile.radius,
          projectile.radius * 2,
          projectile.radius * 2
        );

        return projectile;
      },
      makeShip(color) {
        const radius = 25,
          ship = draw.rect(radius, radius, color, null, null,  -(radius + radius / 10),  -(radius / 2));

        // continue to draw on the ship Shape to create our design //
        draw.circle(radius + 3, color, null, null, null, null, ship);
        draw.circle(radius, "#CCC", null, null, null, null, ship);
        draw.polyStar(radius, 3, 0, 0, color, null, null, null, null, ship);
        draw.circle(radius - 15, "#CCC", null, null, -5, null, ship);

        // reset the radius, other non-radii drawing operations have overwritten it //
        ship.radius = radius + 3;
        ship.color = color;

        // rasterize the vector graphic, basically creating a bitmap //
        ship.snapToPixel = true;
        ship.cache(
          -radius - 10,
          -radius - 10,
          radius * 2 + 15,
          radius * 2 + 15
        );

        // Merge the ship with your game libs makeBody()
        Object.assign(ship, phyz.makeBody("ship"));

        // give the ship a default propulsion //
        ship.propulsion = 0;

        // set a random rotation value //
        ship.rotation = numz.randomIntBetween(0, 359);

        // set the update behavior for the ship //
        ship.update = updateShip;

        /*
         * Returns the global position of where
         * we want the exhaust to show up. This
         * global point will be passed to the
         * partical manager, who'll create and
         * render the ship's exhaust.
         */
        ship.getExhaustPoint = getExhaustPoint;

        /*
         * Returns the global position from where
         * we want the projectile to launch. This
         * global point will be passed to the
         * projectile manager, who'll create and
         * render the ship's projectile.
         */
        ship.getProjectilePoint = getProjectilePoint;

        ship.explosion = fx.makeEmitter(
          5,
          8,
          null,
          new Proton.Velocity(
            new Proton.Span(4, 2),
            new Proton.Span(0, 360),
            "polar"
          ),
          [new Proton.RandomDrift(5, 0, 0.35)]
        );

        // randomized position within canvas //
        ship.x = numz.randomIntBetween(0, canvas.width);
        ship.y = numz.randomIntBetween(0, canvas.height);

        return ship;
      },
      makeOrb() {
        const orb = draw.randomCircleInArea(canvas, false, true, "#999", 2);
        // console.log(`rad: ${orb.radius}`);
        // console.log(`den: ${orb.radius / 20 * 0.5}`);
        Object.assign(
          orb,
          phyz.makeBody("orb", {
            density: (orb.radius / 20) * 0.5,
            volatility: orb.radius * 0.0001,
          })
        );
        phyz.addRandomVelocity(orb, canvas);
        orb.update = updateOrb;

        // TODO: why is caching killing the cross on the orb?
        // rasterize the vector graphic, basically creating a bitmap //
        // orb.snapToPixel = true;
        // const rad = orb.radius + 2;
        // orb.cache(-rad, -rad, rad * 2, rad * 2);

        return orb;
      },
      centerOnStage,
      makePariPowerUp() {
        console.log("called makePariPowerUp");
        //  const pariPowerUp = draw.rect(50, 30, "#ff0000ff", null, null,  0,  0);
        pariPowerUp = draw.circle(27, "#33ff00ff", null, null, null, null);
        draw.polyStar(7, 3, 3, 0, "#ff0000ff", null, null, 13, null, pariPowerUp);
          draw.polyStar(4, 3, 4, 180, "#0091ffff", null, null, -15, 0, pariPowerUp);
        draw.rect(28, 30, "#33ff00ff", null, null, -15, -15, pariPowerUp);
          draw.polyStar(5, 4, 5, 0, "#ff0000ff", null, null, -10, 0, pariPowerUp);
            draw.rect(25, 10, "#ff0000ff", null, null, -10, -5, pariPowerUp);
            draw.circle(27, "rgba(0,0,0,0)", null, null, null, null, pariPowerUp);

            
        
        pariPowerUp.x = numz.randomIntBetween(0, canvas.width);
        pariPowerUp.y = numz.randomIntBetween(0, canvas.height);
        console.log(`rad: ${pariPowerUp.radius}`);
        console.log(`den: ${pariPowerUp.radius / 20 * 0.5}`);
        Object.assign(
          pariPowerUp,
          phyz.makeBody("pariPowerUp", {
            density: (pariPowerUp.radius / 20) * 0.5,
            volatility: pariPowerUp.radius * 0.0001,
          })
        );
        phyz.addRandomVelocity(pariPowerUp, canvas);
        pariPowerUp.update = updatePariPowerUp;
        return pariPowerUp;
      },
      makeLaserPower() {
        console.log("called makeLaserPower");
        //  const pariPowerUp = draw.rect(50, 30, "#ff0000ff", null, null,  0,  0);
        LaserPower = draw.circle(27, "#0059ffff", null, null, null, null);
        draw.polyStar(32, 9, 2, 0, "#ff0000ff", null, null, 0, null, LaserPower);
        draw.polyStar(32, 9, 2, 20, "#0059ffff", null, null, 0, null, LaserPower);
        draw.polyStar(22, 9, 2, 20, "#ff0000ff", null, null, 0, null, LaserPower);
        draw.polyStar(22, 9, 2, 40, "#0059ffff", null, null, 0, null, LaserPower);
        draw.polyStar(15, 9, 2, 0, "#ff0000ff", null, null, 0, null, LaserPower);
        draw.polyStar(15, 9, 2, 20, "#0059ffff", null, null, 0, null, LaserPower);
            draw.circle(27, "rgba(0,0,0,0)", null, null, null, null, LaserPower);

            
        
        LaserPower.x = numz.randomIntBetween(0, canvas.width);
        LaserPower.y = numz.randomIntBetween(0, canvas.height);
        console.log(`rad: ${LaserPower.radius}`);
        console.log(`den: ${LaserPower.radius / 20 * 0.5}`);
        Object.assign(
          LaserPower,
          phyz.makeBody("LaserPower", {
            density: (LaserPower.radius / 20) * 0.5,
            volatility: LaserPower.radius * 0.0001,
          })
        );
        phyz.addRandomVelocity(LaserPower, canvas);
        LaserPower.update = updateLaserPower;
        return LaserPower;
      },
      makeFreezePower() {
        console.log("called makeFreezePower");
        //  const pariPowerUp = draw.rect(50, 30, "#ff0000ff", null, null,  0,  0);
        FreezePower = draw.circle(27, "#000000ff", null, null, null, null);
        draw.polyStar(5, 600, 100, 0, "#ffffffff", null, null, 0, null, FreezePower);
            draw.circle(27, "rgba(0,0,0,0)", null, null, null, null, FreezePower);

            
        
        FreezePower.x = numz.randomIntBetween(0, canvas.width);
        FreezePower.y = numz.randomIntBetween(0, canvas.height);
        console.log(`rad: ${FreezePower.radius}`);
        console.log(`den: ${FreezePower.radius / 20 * 0.5}`);
        Object.assign(
          FreezePower,
          phyz.makeBody("FreezePower", {
            density: (FreezePower.radius / 20) * 0.5,
            volatility: FreezePower.radius * 0.0001,
          })
        );
        phyz.addRandomVelocity(FreezePower, canvas);
        FreezePower.update = updateFreezePower;
        return FreezePower;
      },
    };
  });
})(window, window.opspark, window._);
