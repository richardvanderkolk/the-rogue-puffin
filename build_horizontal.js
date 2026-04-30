const sharp = require('sharp');

async function build() {
  try {
    // 1. Extract puffin from premium-logo
    const puffinPart = await sharp('public/assets/premium-logo.png')
      .extract({ left: 100, top: 0, width: 824, height: 500 }) // Crop the center puffin part
      .toBuffer();

    // 2. Read transparent text
    const textBuffer = await sharp('public/assets/premium-text-transparent.png').toBuffer();
    
    // 3. Create 1600x500 canvas
    await sharp({
      create: {
        width: 1600,
        height: 500,
        channels: 3,
        background: { r: 2, g: 5, b: 10 }
      }
    })
    .composite([
      { input: puffinPart, top: 0, left: -50 }, // Place puffin on left
      { input: textBuffer, top: 120, left: 700 } // Place text on right
    ])
    .jpeg({ quality: 95 })
    .toFile('public/assets/rectangular-logo.jpg');
    
    console.log("Built rectangular-logo.jpg");
  } catch (err) {
    console.error(err);
  }
}
build();
