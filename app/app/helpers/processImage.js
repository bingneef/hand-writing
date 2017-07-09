export const calcValues = (ctx, {debug = false}) => {
  let values = []

  const box = getBoundingBox(ctx, 0, 0, 320, 320)
  const width = box.right - box.left
  const height = box.bottom - box.top

  const boxCount = 8

  let properties = {}
  if (width > height) {
    properties = {
      x: box.left,
      y: box.top - (width - height) / 2,
      width: width,
      height: width,
    }
  } else {
    properties = {
      x: box.left - (height - width) / 2,
      y: box.top,
      width: height,
      height: height,
    }
  }

  let widthStep = properties.width / boxCount
  let heightStep = properties.height / boxCount

  for (let i = 0; i < boxCount; i++) {
    for (let j = 0; j < boxCount; j++) {
      let sum = [0,0,0]

      let x_start = j * widthStep + properties.x
      let y_start = i * heightStep + properties.y

      let imgData = ctx.getImageData(x_start, y_start, widthStep, heightStep);
      for (let k = 0; k < imgData.data.length; k += 4) {
        sum[0] += (255 - imgData.data[k]) * imgData.data[k + 3] / 255
        sum[1] += (255 - imgData.data[k + 1]) * imgData.data[k + 3] / 255
        sum[2] += (255 - imgData.data[k + 2]) * imgData.data[k + 3] / 255
      }

      let totalSum = (0.3 * sum[0] + 0.59 * sum[1] + 0.11 * sum[2]) / 255
      let greyScore = 16 - Math.round(totalSum / (imgData.data.length / 4) * 16)
      values.push(greyScore)
    }
  }

  if (debug) {
    ctx.lineWidth = 4
    ctx.rect(properties.x,properties.y,properties.width,properties.height);
    ctx.stroke();

    let row = -1
    ctx.globalAlpha = 0.8
    for (let i = 0; i < values.length; i++) {
      if (i % boxCount === 0) {
        row++
      }

      let x_start = (i % boxCount) * widthStep + properties.x
      let y_start = row * heightStep + properties.y

      let fillValue = 1 - (values[i] / 16)

      ctx.fillStyle = `rgba(0,0,255,0.2)`;
      ctx.fillRect(x_start, y_start,widthStep,heightStep);

      if (values[i] < 16) {
        ctx.fillStyle = `rgba(255,0,0,${fillValue})`;
        ctx.fillRect(x_start, y_start,widthStep,heightStep);
      }
    }
  }

  return values
}

export const getBoundingBox = (ctx, x, y, width, height) => {
  let ret = {}

  // Get the pixel data from the canvas
  const data = ctx.getImageData(x, y, width, height).data
  let first = false
  let last = false
  let right = false
  let left = false
  let r = height
  let w = 0
  let c = 0
  let d = 0

  // 1. get bottom
  while(!last && r) {
    r--
    for(c = 0; c < width; c++) {
      if(data[r * width * 4 + c * 4 + 3]) {
        last = r+1
        ret.bottom = r+1
        break
      }
    }
  }

  // 2. get top
  r = 0
  var checks = [];
  while(!first && r < last) {

    for(c = 0; c < width; c++) {
      if(data[r * width * 4 + c * 4 + 3]) {
        first = r-1
        ret.top = r-1
        ret.height = last - first - 1
        break
      }
    }
    r++
  }

  // 3. get right
  c = width
  while(!right && c) {
    c--
    for(r = 0; r < height; r++) {
      if(data[r * width * 4 + c * 4 + 3]) {
        right = c+1
        ret.right = c+1
        break
      }
    }
  }

  // 4. get left
  c = 0;
  while(!left && c < right) {

    for(r = 0; r < height; r++) {
      if(data[r * width * 4 + c * 4 + 3]) {
        left = c
        ret.left = c
        ret.width = right - left - 1
        break
      }
    }
    c++

    // If we've got it then return the height
    if(left) {
      return ret
    }
  }
  return ret
}
