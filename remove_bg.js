const sharp = require('sharp');

async function removeBackground() {
  try {
    const { data, info } = await sharp('public/assets/premium-text-crop.png')
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      
      if (luma < 25) {
        data[i+3] = 0;
      } else if (luma < 80) {
        data[i+3] = Math.floor(((luma - 25) / 55) * 255);
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
    
    console.log('Background removed!');
  } catch (err) {
    console.error(err);
  }
}

removeBackground();
