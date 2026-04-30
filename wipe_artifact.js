const sharp = require('sharp');

async function processImage() {
  try {
    const { data, info } = await sharp('public/assets/premium-logo.png')
      .extract({ left: 50, top: 590, width: 924, height: 410 })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * 4;
        
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        
        if (luma < 25) {
          data[idx+3] = 0;
        } else if (luma < 80) {
          data[idx+3] = Math.floor(((luma - 25) / 55) * 255);
        }
        
        // Wipe out the top 80 pixels on the left and right, leaving the center intact for "THE"
        if (y < 80 && (x < 380 || x > 544)) {
           data[idx+3] = 0; 
        }
      }
    }

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile('public/assets/premium-text-transparent.png');
    
    console.log('Artifact wiped!');
  } catch (err) {
    console.error(err);
  }
}

processImage();
