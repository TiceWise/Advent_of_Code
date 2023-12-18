// import { Canvas } from 'canvas'
// import fs from 'fs'
// import path from 'path'
//
// const imageSize = 100
//
// const col = 10
// const row = 10
// const steps = 50
//
// const canvas = new Canvas(imageSize, imageSize)
// const context = canvas.getContext('2d')
// context.beginPath()
// context.moveTo(col, row)
// context.lineTo(col + steps, row)
// context.lineTo(col + steps, row + 1)
// context.lineTo(col, row + 1)
// context.closePath()
// context.lineWidth = 5
// context.fillStyle = 'rgb(' + 100 + ',' + 200 + ',' + 50 + ')'
// context.fill()
// const dataUrl = canvas.toDataURL('image/png')
// const base64Data = dataUrl.split(';base64,').pop()
// if (base64Data) {
//   const buf = Buffer.from(base64Data, 'base64')
//   fs.writeFile(path.join(__dirname, 'test.png'), buf, (err) => {
//     if (err) {
//       console.error('Error saving file:', err)
//     } else {
//       console.log('Image saved successfully.')
//     }
//   })
// } else {
//   console.error('Invalid base64 data.')
// }
