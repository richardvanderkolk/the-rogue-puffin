const sharp = require('sharp');

async function checkBg() {
  const { data } = await sharp('public/assets/premium-logo.png')
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  console.log(`Top-left pixel: rgb(${data[0]}, ${data[1]}, ${data[2]})`);
}
checkBg();
