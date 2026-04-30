const sharp = require('sharp');

async function build() {
  try {
    const puffinBuffer = await sharp('public/assets/premium-logo.png')
      .extract({ left: 50, top: 0, width: 850, height: 500 }) 
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let y = 0; y < puffinBuffer.info.height; y++) {
      for (let x = 0; x < puffinBuffer.info.width; x++) {
        const idx = (y * puffinBuffer.info.width + x) * 3;
        
        let r = puffinBuffer.data[idx];
        let g = puffinBuffer.data[idx+1];
        let b = puffinBuffer.data[idx+2];
        
        if (r < 25 && g < 25 && b < 25) {
          r = 0; g = 0; b = 0;
        }

        if (x > 650) {
           const factor = Math.max(0, 1 - ((x - 650) / 200)); 
           r = Math.floor(r * factor);
           g = Math.floor(g * factor);
           b = Math.floor(b * factor);
        }

        puffinBuffer.data[idx] = r;
        puffinBuffer.data[idx+1] = g;
        puffinBuffer.data[idx+2] = b;
      }
    }

    const processedPuffin = await sharp(puffinBuffer.data, {
      raw: { width: puffinBuffer.info.width, height: puffinBuffer.info.height, channels: 3 }
    }).png().toBuffer();

    const textBuffer = await sharp('public/assets/premium-text-transparent.png')
       .resize({ height: 160 }) 
       .png().toBuffer();
    
    await sharp({
      create: {
        width: 1600,
        height: 500,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 } 
      }
    })
    .composite([
      { input: processedPuffin, top: 0, left: 0 }, 
      { input: textBuffer, top: 180, left: 600 }
    ])
    .trim({ threshold: 0 })
    .png()
    .toFile('public/assets/rectangular-logo.png');
    
    console.log("Built perfect rectangular-logo.png");
  } catch (err) {
    console.error(err);
  }
}
build();
