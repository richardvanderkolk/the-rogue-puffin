const sharp = require('sharp');

async function analyze() {
  const { data, info } = await sharp('public/assets/premium-logo.png')
    .extract({ left: 50, top: 590, width: 924, height: 410 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let theMinX = 9999, theMaxX = 0;
  let featherMinX = 9999, featherMaxX = 0;

  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 4;
      const luma = 0.299 * data[idx] + 0.587 * data[idx+1] + 0.114 * data[idx+2];
      
      if (luma > 25) { // Visible pixel
        // Determine if it's left or right
        if (x < 450) {
           if (x < theMinX) theMinX = x;
           if (x > theMaxX) theMaxX = x;
        } else {
           if (x < featherMinX) featherMinX = x;
           if (x > featherMaxX) featherMaxX = x;
        }
      }
    }
  }

  console.log(`Left object (THE?) bounds: ${theMinX} to ${theMaxX}`);
  console.log(`Right object (Feather?) bounds: ${featherMinX} to ${featherMaxX}`);
}

analyze();
