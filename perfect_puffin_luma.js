const sharp = require('sharp');

async function process() {
  const buff = await sharp('public/assets/premium-logo.png')
    .extract({ left: 100, top: 0, width: 824, height: 500 }) // Extract top half
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  for (let y = 0; y < buff.info.height; y++) {
    for (let x = 0; x < buff.info.width; x++) {
      const idx = (y * buff.info.width + x) * 4;
      const r = buff.data[idx];
      const g = buff.data[idx+1];
      const b = buff.data[idx+2];
      
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // Luma to Alpha mask
      let alpha = 255;
      if (luma < 10) {
         alpha = 0;
      } else if (luma < 40) {
         alpha = Math.floor(((luma - 10) / 30) * 255);
      }
      
      buff.data[idx+3] = alpha;
    }
  }

  await sharp(buff.data, { raw: { width: buff.info.width, height: buff.info.height, channels: 4 } })
    .trim({ threshold: 0 }) // PERFECT HUG
    .png()
    .toFile('public/assets/puffin-perfect.png');
    
  console.log("Perfect luma puffin generated!");
}
process();
