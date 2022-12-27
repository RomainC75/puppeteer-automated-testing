const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Feedback Test', () => { 
    let browser
    let page
    before(async ()=>{
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 10,
            devtools: true
        })
        page = await browser.newPage()
        page.setDefaultTimeout(10000)
        page.setDefaultNavigationTimeout(20000)
    })

    after(async()=>{
        await browser.close()
    })

    it('Display Feedback',async()=>{
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#feedback')
        await page.click('#feedback')
        // await page.waitForSelector('#feedback-title')
    })

    it('Submit Feedback', async()=>{
        await page.waitForSelector('#feedback-title')
        await page.type('#name','name',{delay:20})
        await page.type('#email','name',{delay:20})
        await page.type('#subject','name',{delay:20})
        await page.type('#comment','name',{delay:20})
        await page.click('input[type="submit"]')

    })

    it('Display Results Page', async()=>{
        await page.waitForSelector('#feedback-title')
        const url = await page.url()
        expect(url).to.include('Feedback.html')
    })
 })