const sharp = require('sharp');

async function build() {
  try {
    // 1. Rebuild perfect text
    const textData = await sharp('public/assets/premium-logo.png')
      .extract({ left: 50, top: 590, width: 924, height: 410 })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let y = 0; y < textData.info.height; y++) {
      for (let x = 0; x < textData.info.width; x++) {
        const idx = (y * textData.info.width + x) * 4;
        const luma = 0.299 * textData.data[idx] + 0.587 * textData.data[idx+1] + 0.114 * textData.data[idx+2];
        
        if (luma < 25) {
          textData.data[idx+3] = 0;
        } else if (luma < 80) {
          textData.data[idx+3] = Math.floor(((luma - 25) / 55) * 255);
        }

        // PERFECT WIPE:
        // Wipe everything above y=50 (removes top artifacts)
        if (y < 50) {
           textData.data[idx+3] = 0;
        }
        // Wipe right side feather (above y=105, right of x=430)
        else if (y < 105 && x > 430) {
           textData.data[idx+3] = 0;
        }
        // Wipe left side artifacts (above y=105, left of x=260)
        else if (y < 105 && x < 260) {
           textData.data[idx+3] = 0;
        }
      }
    }

    const perfectTextBuffer = await sharp(textData.data, {
      raw: { width: textData.info.width, height: textData.info.height, channels: 4 }
    })
    .trim({ threshold: 0 })
    .png()
    .toBuffer();

    // Resize text to be properly proportioned
    const resizedText = await sharp(perfectTextBuffer)
      .resize({ height: 160 })
      .png()
      .toBuffer();

    // 2. Extract and process puffin
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

    // 3. Composite!
    // User requested: "the text should move the right a bit so it does not interfere with the image of the puffin"
    // Previously: left: 600. Let's move it to left: 700! And increase canvas width to 1800.
    await sharp({
      create: {
        width: 1800,
        height: 500,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 } 
      }
    })
    .composite([
      { input: processedPuffin, top: 0, left: 0 }, 
      { input: resizedText, top: 180, left: 700 }
    ])
    .trim({ threshold: 0 })
    .png()
    .toFile('public/assets/rectangular-logo.png');
    
    console.log("Rebuilt perfectly!");
  } catch (err) {
    console.error(err);
  }
}
build();
