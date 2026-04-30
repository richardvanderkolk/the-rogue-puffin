const sharp = require('sharp');

async function printAscii() {
  const { data, info } = await sharp('public/assets/test-crop-590.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Print every 10th pixel for the top 120 rows
  for (let y = 0; y < 150; y += 5) {
    let row = '';
    for (let x = 0; x < info.width; x += 10) {
      const idx = (y * info.width + x) * 4;
      const alpha = data[idx+3];
      if (alpha > 128) {
        row += '#';
      } else if (alpha > 20) {
        row += '.';
      } else {
        row += ' ';
      }
    }
    console.log(y.toString().padStart(3, '0') + '|' + row);
  }
}
printAscii();
