const puppeteer = require('puppeteer')
const { click } = require('../lib/helpers')

describe('Device emulation', () => {
   let browser
   let page

   before(async () => {
      browser = await puppeteer.launch({
         headless: false,
         slowMo: 10,
         devtools: false,
      })
      const context = await browser.createIncognitoBrowserContext()
      page = await context.newPage()
      page.setDefaultTimeout(10000)
      page.setDefaultNavigationTimeout(20000)
   })

   after(async () => {
      await browser.close()
   })

   //    ================================
   it('should click on the button',async()=>{
      await page.goto('http://zero.webappsecurity.com/index.html')
      await click(page, '#online-banking')
      await page.waitForFunction(()=>!document.querySelector('#online-banking'))
   })

   it('Desktop Device Test', async () => {
      await page.setViewport({
         width: 1650,
         height: 1050,
      })
      await page.goto('https://www.example.com')
      //other tests ...
      await page.waitForTimeout(1000)
   })
   it('Tablet Device Test', async () => {
      const tablet = puppeteer.KnownDevices['iPad landscape']
      console.log('landscape : ', tablet)
      await page.emulate(tablet)
      await page.goto('https://www.example.com')
      //other tests ...
      await page.waitForTimeout(1000)
   })
   it('Mobile Device Test', async () => {
      const mobile = puppeteer.KnownDevices['iPhone X']
      await page.emulate(mobile)
      await page.goto('https://www.example.com')
      //other tests ...
      await page.waitForTimeout(1000)
   })
})
