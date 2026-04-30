const Jimp = require('jimp');

async function processImage() {
  try {
    const image = await Jimp.read('public/assets/premium-text-crop.png');
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
      
      let alpha = 255;
      if (brightness < 25) {
        alpha = 0;
      } else if (brightness < 80) {
        alpha = Math.floor(((brightness - 25) / 55) * 255);
      }
      
      this.bitmap.data[idx + 3] = alpha;
    });
    
    await image.writeAsync('public/assets/premium-text-transparent.png');
    console.log("Done");
  } catch (err) {
    console.error(err);
  }
}
processImage();
