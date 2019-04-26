/**
 * Copyright © 2019 Alexandre Borela <alexandre@borela.tech>
 *
 * NOTICE: All information contained herein is, and remains the property of
 * Alexandre Borela and his suppliers, if any. The intellectual and technical
 * concepts contained herein are proprietary to Alexandre Borela and his
 * suppliers and may be covered by patents, patents in process, and are
 * protected by trade secret or copyright law. Dissemination of this information
 * or reproduction of this material is strictly forbidden unless prior written
 * permission is obtained from Alexandre Borela.
 */

'use strict';

const HOME_ANIMATION = new p5(sketch => {
  const {
    ADD,
    BLEND,
    BURN,
    CENTER,
    CORNER,
    CORNERS,
    DARKEST,
    DIFFERENCE,
    DODGE,
    EXCLUSION,
    HARD_LIGHT,
    LIGHTEST,
    MULTIPLY,
    NORMAL,
    OVERLAY,
    REPLACE,
    SCREEN,
    SOFT_LIGHT,
  } = sketch

  let backgroundMap = null
  let trailsBuffer = null

  let cloudGrid = []
  const COLUMNS = 10
  const ROWS = 4

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      const DURATION = Math.max(
        Math.floor(Math.random() * 420),
        120,
      )

      cloudGrid.push({
        column: j,
        row: i,
        frame: Math.floor(Math.random() * DURATION),
        duration: DURATION,
      })
    }
  }

  // All trails share the same origin.
  const TRAIL_ORIGIN = {
    x: 740,
    y: 1140,
  }

  // The actual trails.
  let TRAILS = [{
    x: 480,
    y: 630,
  }, {
    x: 1077,
    y: 833,
  }, {
    x: 1245,
    y: 850,
  }, {
    x: 1250,
    y: 965,
  }, {
    x: 1230,
    y: 1130,
  }, {
    x: 1910,
    y: 1110,
  }, {
    x: 2045,
    y: 1050,
  }, {
    x: 2105,
    y: 1150,
  }, {
    x: 1820,
    y: 800,
  }, {
    x: 1810,
    y: 650,
  }, {
    x: 1630,
    y: 630,
  }, {
    x: 1270,
    y: 530,
  }, {
    x: 1120,
    y: 560,
  }, {
    x: 780,
    y: 275,
  }, {
    x: 840,
    y: 130,
  }, {
    x: 600,
    y: 435,
  }, {
    x: 350,
    y: 625,
  }, {
    x: 380,
    y: 450,
  }, {
    x: 200,
    y: 380,
  }, {
    x: 675,
    y: 1150,
  }, {
    x: 610,
    y: 1255,
  }, {
    x: 1770,
    y: 200,
  }, {
    x: 1950,
    y: 300,
  }, {
    x: 2165,
    y: 340,
  }, {
    x: 1390,
    y: 490,
  }]

  // Add random duration for each trail.
  for (const TRAIL of TRAILS) {
    const DURATION = Math.max(
      Math.random() * 320,
      240,
    )

    TRAIL.frame = Math.floor(Math.random() * DURATION)
    TRAIL.duration = DURATION
  }

  function renderTrails() {
    const H = trailsBuffer.height
    const W = trailsBuffer.width

    trailsBuffer.fill(0, 0, 0, 10)
    trailsBuffer.rect(0, 0, W, H)

    const AX = TRAIL_ORIGIN.x
    const AY = TRAIL_ORIGIN.y

    for (const TRAIL of TRAILS) {
      const {
        x: BX,
        y: BY,
        duration: DURATION,
        frame: FRAME
      } = TRAIL

      const PERCENT = FRAME / DURATION
      const X = (BX - AX) * PERCENT + AX
      const Y = (BY - AY) * PERCENT + AY

      trailsBuffer.noStroke()
      trailsBuffer.fill(255, 255, 255)
      trailsBuffer.circle(X, Y, 4)

      if (FRAME >= DURATION)
        TRAIL.frame = -1
      TRAIL.frame++
    }
  }

  function calculateBackgroundFinalSize() {
    const H = home.clientHeight
    const W = home.clientWidth
    const {
      height: BH,
      width: BW
    } = backgroundMap

    let height = -20
    let width = -20

    if (H > W) {
      height += BH / BW * W
      width += W
    } else {
      height += H
      width += BW / BH * H
    }

    return {height, width}
  }

  sketch.draw = () => {
    sketch.resizeCanvas(
      home.clientWidth,
      home.clientHeight,
      true,
    )

    const H = home.clientHeight
    const W = home.clientWidth
    const CH = H / ROWS
    const CW = W / COLUMNS
    const {
      height: BH,
      width: BW
    } = calculateBackgroundFinalSize()

    sketch.clear()
    sketch.background(242, 111, 0)

    // Background.
    sketch.blendMode(BLEND)
    sketch.imageMode(CENTER)
    sketch.image(backgroundMap, W / 2, H / 2, BW, BH)

    // Trails.
    renderTrails()
    sketch.blendMode(SCREEN)
    sketch.imageMode(CENTER)
    sketch.image(trailsBuffer, W / 2, H / 2, BW, BH)
    sketch.blendMode(BLEND)

    // Cloud grid.
    for (let cloud of cloudGrid) {
      cloud.frame++
      if (cloud.frame > cloud.duration)
        cloud.frame = 0

      const X = CW * cloud.column
      const Y = CH * cloud.row
      const PERCENT = (1 - (cloud.frame / cloud.duration))

      sketch.stroke(0,0,0,0)
      sketch.fill(255, 255, 255, PERCENT * 30)
      sketch.rect(X, Y, CW, CH)

      sketch.fill(255, 255, 255, 255)
      sketch.circle(X, Y, 2)
    }
  }

  sketch.setup = () => {
    sketch.createCanvas(
      home.clientWidth,
      home.clientHeight,
    )

    trailsBuffer = sketch.createGraphics(
      backgroundMap.width,
      backgroundMap.height,
    )
  }

  sketch.preload = () => {
    backgroundMap = sketch.loadImage('images/map.png')
  }
}, home)

function startHomeAnimation() {
  HOME_ANIMATION.loop()
}

function stopHomeAnimation() {
  HOME_ANIMATION.noLoop()
}
