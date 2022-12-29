const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')

const url = 'https://www.example.com'

expect.extend({toMatchImageSnapshot})



describe('Visual Regression Testing', ()=>{
    let browser
    let page

    beforeAll(async ()=>{
        browser = await puppeteer.launch({headless:false})
        page = await browser.newPage()
    })

    afterAll(async()=>{
        await browser.close()

    })

    test('Full Page Snapshot', async ()=>{
        await page.goto(url)
        await page.waitForSelector('h1')
        // screenshot of the page
        const image = await page.screenshot()
        expect(image).toMatchImageSnapshot({
            failureTresholdType: 'pixel',
            falureTreshold: 500
        })
    })

    test('Single Element Snapshot', async()=>{
        await page.goto(url)
        const h1 = await page.waitForSelector('h1')
        //screenshot of the element
        const image = await h1.screenshot()
        expect(image).toMatchImageSnapshot({
            failureTresholdType: 'percent',
            failureTreshold: 0.01
        })
    })

    test('Mobile Snapshot',async ()=>{
        await page.goto(url)
        await page.waitForSelector('h1')

        const mobile = puppeteer.KnownDevices['iPhone X']
        await page.emulate(mobile)
        const image = await page.screenshot()
        expect(image).toMatchImageSnapshot({
            failureThresholdType:'percent',
            falureTreshold: 0.01
        })
    })

    test('Table Snapshot',async ()=>{
        await page.goto(url)
        await page.waitForSelector('h1')
        
        const mobile = puppeteer.KnownDevices['iPad landscape']
        await page.emulate(mobile)
        const image = await page.screenshot()
        expect(image).toMatchImageSnapshot({
            failureThresholdType:'percent',
            falureTreshold: 0.01
        })
    })

    // hide "dynamic" content
    test.only('Remove Element Before Snapshot', async()=>{
        await page.goto(url)
        await page.waitForSelector('h1')
        await page.evaluate(()=>{
            (document.querySelectorAll('h1') || []).forEach(el=>el.remove())
        })
        const mobile = puppeteer.KnownDevices['iPad landscape']
        await page.emulate(mobile)
        await page.waitForTimeout(5000)
        const image = await page.screenshot()
        expect(image).toMatchImageSnapshot({
            failureThresholdType:'percent',
            falureTreshold: 0.01
        })
    })
})