const sharp = require('sharp');

async function process() {
  const buff = await sharp('public/assets/puffin-only.jpg').raw().toBuffer({ resolveWithObject: true });
  for(let i = 0; i < buff.data.length; i+=3) {
    if(buff.data[i] < 25 && buff.data[i+1] < 25 && buff.data[i+2] < 25) {
      buff.data[i] = 0; buff.data[i+1] = 0; buff.data[i+2] = 0;
    }
  }
  await sharp(buff.data, { raw: { width: buff.info.width, height: buff.info.height, channels: 3 } })
    .jpeg({ quality: 95 })
    .toFile('public/assets/puffin-only-crushed.jpg');
}
process();
