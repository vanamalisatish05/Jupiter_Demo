import { lighthouseTest } from './BaseTests'; 
import { playAudit } from 'playwright-lighthouse'

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
      await playAudit({
        page,
        thresholds: {
          performance: 50,
        },
        port,
        reports: {
          formats: {
            json: true
          },
          name: `ligthouse-url:${url}-${new Date().toISOString()}`, //defaults to `lighthouse-${new Date().getTime()}`
          directory: `${process.cwd()}/test-results/lighthouse`,
        }
      })
      await page.close();
    })
  })
})