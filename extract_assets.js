const sharp = require('sharp');

async function build() {
  try {
    // 1. Extract puffin-only
    await sharp('public/assets/premium-logo.png')
      .extract({ left: 100, top: 0, width: 824, height: 500 }) 
      .toFile('public/assets/puffin-only.jpg');

    // 2. Extract text-only with thresholding
    const textData = await sharp('public/assets/premium-logo.png')
      .extract({ left: 50, top: 590, width: 924, height: 410 })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let y = 0; y < textData.info.height; y++) {
      for (let x = 0; x < textData.info.width; x++) {
        const idx = (y * textData.info.width + x) * 4;
        const luma = 0.299 * textData.data[idx] + 0.587 * textData.data[idx+1] + 0.114 * textData.data[idx+2];
        
        // Ghost feather is faint. Text is bright.
        // Let's kill everything below luma 80!
        if (luma < 80) {
          textData.data[idx+3] = 0;
        } else {
          // Smooth fade for anti-aliasing
          textData.data[idx+3] = Math.min(255, Math.floor((luma - 80) * (255 / 175)));
        }
      }
    }

    await sharp(textData.data, {
      raw: { width: textData.info.width, height: textData.info.height, channels: 4 }
    })
    .trim({ threshold: 0 })
    .png()
    .toFile('public/assets/text-only.png');
    
    console.log("Extracted assets!");
  } catch (err) {
    console.error(err);
  }
}
build();
