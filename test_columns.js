const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  
  await page.goto('http://localhost:3001/textbook', { waitUntil: 'networkidle0' });
  
  // Click open 3D Book View
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('Open 3D Book View'));
    if (btn) btn.click();
  });
  
  await page.waitForTimeout(2000);
  
  // Get the computed width of the element containing "Welcome to the 1%"
  const data = await page.evaluate(() => {
    const h1s = Array.from(document.querySelectorAll('h1'));
    const h1 = h1s.find(h => h.textContent.includes('Welcome to the'));
    if (!h1) return 'H1 not found';
    
    let el = h1;
    const res = [];
    while (el && el.tagName !== 'BODY') {
      const style = window.getComputedStyle(el);
      res.push({
        tag: el.tagName,
        className: el.className,
        width: style.width,
        columnWidth: style.columnWidth,
        columnCount: style.columnCount,
        display: style.display,
        position: style.position,
        height: style.height
      });
      el = el.parentElement;
    }
    return res;
  });
  
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
