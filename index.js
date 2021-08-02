require('dotenv').config()
const scraper = require('./candy-claimer');
const cron = require('node-cron');

(async () => {
	const ACCOUNTS = [{
		email: process.env.EMAIL,
		password: process.env.PASSWORD
	}];

	try {
		if (process.env.NODE_ENV === 'development') {
			await scraper.claimCandy(ACCOUNTS[0]);
		} else {
			cron.schedule('* * * * *', async () => {
				try {
					await scraper.claimCandy(ACCOUNTS[0])
				}catch (e) {
					console.log(e);
				}
			}, {});
		}
	} catch (e) {
		console.log(e);
	}

})();

