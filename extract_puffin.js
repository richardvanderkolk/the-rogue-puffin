const sharp = require('sharp');

async function process() {
  const buff = await sharp('public/assets/premium-logo.png')
    .extract({ left: 100, top: 0, width: 824, height: 500 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const centerX = 412; // Middle of 824
  const centerY = 250; // Middle of 500

  for (let y = 0; y < buff.info.height; y++) {
    for (let x = 0; x < buff.info.width; x++) {
      const idx = (y * buff.info.width + x) * 4;
      
      // Calculate elliptical distance (wider than tall)
      const dx = (x - centerX) / 1.5;
      const dy = (y - centerY) / 1.0;
      const distance = Math.sqrt(dx*dx + dy*dy);
      
      // Fade out starting at distance 150, fully transparent by 250
      let alpha = 255;
      if (distance > 180) {
         alpha = Math.max(0, 255 - (distance - 180) * 3);
      }
      
      buff.data[idx+3] = alpha;
    }
  }

  await sharp(buff.data, { raw: { width: buff.info.width, height: buff.info.height, channels: 4 } })
    .trim({ threshold: 0 })
    .png()
    .toFile('public/assets/puffin-transparent.png');
}
process();
