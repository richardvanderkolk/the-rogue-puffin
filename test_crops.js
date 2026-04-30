const sharp = require('sharp');

async function processCrop(topValue, suffix) {
  try {
    const { data, info } = await sharp('public/assets/premium-logo.png')
      .extract({ left: 50, top: topValue, width: 924, height: 1000 - topValue })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * 4;
        const luma = 0.299 * data[idx] + 0.587 * data[idx+1] + 0.114 * data[idx+2];
        if (luma < 25) {
          data[idx+3] = 0;
        } else if (luma < 80) {
          data[idx+3] = Math.floor(((luma - 25) / 55) * 255);
        }
      }
    }

    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 0 })
    .png()
    .toFile(`public/assets/test-crop-${suffix}.png`);
  } catch (err) {
    console.error(err);
  }
}

async function run() {
  await processCrop(590, '590');
  await processCrop(600, '600');
  await processCrop(610, '610');
  await processCrop(620, '620');
  await processCrop(630, '630');
  console.log("Done");
}
run();
