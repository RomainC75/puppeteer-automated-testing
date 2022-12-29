const puppeteer = require('puppeteer')
const  percySnapshot  = require('@percy/puppeteer')

describe('Percy Visual Test',()=>{
    let browser
    let page
    beforeAll(async ()=>{
        browser = await puppeteer.launch({headless:true})
        page = await browser.newPage()
    })
    afterAll(async()=>{
        await browser.close()
    })

    test('Full Page Percy Snapshot',async()=>{
        await page.goto('https://www.example.com')
        await page.waitForSelector('h1')
        await page.evaluate(()=>{
            (document.querySelectorAll('h1') || []).forEach(el=>el.remove())
        })
        await page.waitForTimeout(1000)
        await percySnapshot(page, 'Exemple Page')
    })
})