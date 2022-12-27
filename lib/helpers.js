module.exports = {
   click: async (page, selector) => {
      try {
         await page.waitForSelector(selector)
         await page.click(selector)
      } catch (error) {
         throw new Error(`could not click on selector : ${selector}`)
      }
   },
   getText: async (page, selector) => {
      try {
         await page.waitForSelector(selector)
         return await page.$eval(selector, (el) => el.textContent)
      } catch (error) {
         throw new Error(
            `could not get the text with the selector : ${selector}`
         )
      }
   },
   getCount: async (page, selector) => {
      try {
         await page.waitForSelector(selector)
         return await page.$$eval(selector, (els) => els.length)
      } catch (error) {
         throw new Error(
            `could not count the elements with the selector : ${selector}`
         )
      }
   },
   typeText: async (page, selector, text) => {
      try {
         await page.waitForSelector(selector)
         await page.type(selector, text)
      } catch (error) {
         throw new Error(
            `could not type into the input with selector : ${selector}`
         )
      }
   },
   waitForText: async (page, selector, text) => {
      try {
         await page.waitForSelector(selector)
         await page.waitForFunction(
            (selector, text) =>
               document.querySelector(selector).textContent.includes(text),
            {},
            selector,
            text
         )
      } catch (error) {
         throw new Error(
            `could not find the text ||${text}|| in the selector ${selector}`
         )
      }
   },
   shouldNotExist: async (page, selector) => {
      try {
        await page.waitForSelector(selector, {
            hidden: true,
            timeout: 3000,
         })
        // await page.waitForFunction((selector)=>!document.querySelector(selector),{},selector)
      } catch (error) {
        throw new Error(`selector: ${selector} is visible, but should not be`)
      }
   },
}
