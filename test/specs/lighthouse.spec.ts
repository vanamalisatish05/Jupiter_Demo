import { lighthouseTest } from './BaseTests'; 
import { playAudit } from 'playwright-lighthouse';

lighthouseTest.describe('lighthouse', async () => {
  const urls = [
    '',
    'shop',
    'contact',
    'cart',
  ]
  
  urls.forEach(url => {
    lighthouseTest(`${url} page should pass lighthouse test`, async  ({page, port}) => {
      await page.goto("/#/" + url, {waitUntil: "load"})
      await playAudit({page, port})
    })
  })
})