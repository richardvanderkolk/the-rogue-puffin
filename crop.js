const sharp = require('sharp');

async function process() {
  await sharp('public/assets/premium-logo.png')
    .extract({ left: 50, top: 550, width: 924, height: 450 })
    .toFormat('png')
    .toFile('public/assets/premium-text-crop.png');
    
  console.log("Extracted bottom half.");
}
process();
