const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('my first puppeteer test', () => {
   // it('shou launch the browser',async ()=>{
   //     const browser = await puppeteer.launch({
   //         headless:false,
   //         slowMo: 10,
   //         devtools: false
   //     })
   //     const page = await browser.newPage()
   //     await page.goto('http://example.com')
   //     await page.waitForSelector('h1')
   //     await page.goto('https://dev.to')
   //     await page.waitForSelector('#substories')
   //     await page.goBack()
   //     await page.waitForSelector('h1')
   //     await browser.close()
   // })

   //    it('should enter txt in an input and click', async () => {
   //       const browser = await puppeteer.launch({
   //          headless: false,
   //          slowMo: 10,
   //       })
   //       const page = await browser.newPage()
   //       await page.goto('https://devexpress.github.io/testcafe/example/')
   //       await page.type('#developer-name', 'bob', { delay: 1000 })
   //       //   await page.click('#populate', { clickCount: 1 })
   //       await page.click('#tried-test-cafe')
   //       await page.select('#preferred-interface', 'JavaScript API')

   //       await page.type('#comments','my new text')
   //       await new Promise((r) => setTimeout(r, 1000))
   //       await page.click('#submit-button')
   //       await new Promise((r) => setTimeout(r, 1000))

   //       await browser.close()
   //    })

   it('should extract the title, url and text', async () => {
      const browser = await puppeteer.launch({
         headless: false,
         slowMo: 10,
      })
      const page = await browser.newPage()
      //   time after which the browser closes
      await page.setDefaultTimeout(10000)
      await page.setDefaultNavigationTimeout(20000)
      
      await page.goto('https://example.com/')
      await page.waitForXPath('//h1')   
      const title = await page.title()
      const url = await page.url()
      //  const text = await page.evaluate(()=>{
      //     const txt = document.querySelector('p').textContent
      //     return txt
      //  })
      const text = await page.$eval('h1', (el) => el.textContent)
      const count = await page.$$eval('p', (els) => els.length)
      console.log('title :l ', title)
      console.log('url : ', url)
      console.log('first p : ', text)
      console.log('count : ', count)

      expect(title).to.be.a('string', 'Example Domain')
      expect(url).to.include('example.co')
      expect(text).to.be.a('string', 'Example Domain')
      expect(count).to.equal(2)

      await browser.close()
   })

   it('should simulate a keypress', async () => {
      const browser = await puppeteer.launch({
         headless: false,
         slowMo: 10,
      })
      const page = await browser.newPage()
      //   time after which the browser closes
      await page.setDefaultTimeout(10000)
      await page.setDefaultNavigationTimeout(20000)

      await page.goto('http://zero.webappsecurity.com/index.html')
      await page.waitForSelector('#searchTerm')
      await page.type('#searchTerm','text ')
      await page.keyboard.press('Enter', {delay:10})
      // wait until an element disappears
      // 01
      await page.waitForFunction(()=>!document.querySelector('#signin_button'))
      // 02
      await page.waitForSelector('#signin_button', {hidden: true, timeout:3000});

      await browser.close()
   })

})
