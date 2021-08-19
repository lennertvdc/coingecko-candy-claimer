const puppeteer = require('puppeteer');

const URL = 'https://www.coingecko.com/account/candy?locale=en';
const CHROME_OPTIONS = {
	headless: process.env.NODE_ENV !== 'development',
	args: ((process.env.NODE_ENV !== 'development') ? ['--no-sandbox', '--disable-setuid-sandbox'] : []),
	slowMo: 10,
	devtools: true,
	defaultViewport: {
		width: 1920,
		height: 1080
	}
};

async function claimCandy(account) {
	const browser = await puppeteer.launch(CHROME_OPTIONS);
	browser.defaultBrowserContext();
	const page = await browser.newPage();
	await page.goto(URL);

	await page.type('#user_email', account.email, {delay: 30});
	await page.type('#user_password', account.password, {delay: 30});
	await page.keyboard.press('Enter');

	await page.waitForNavigation();
	try {
		await page.click('input.collect-candy-button');
		await browser.close();
	} catch (e) {
		await browser.close();
		throw 'Can not claim candies, candies are already claimed.';
	}

}

module.exports = {claimCandy};
