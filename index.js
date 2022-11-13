
const axios = require("axios");
const cheerio = require("cheerio");
const cron = require('node-cron');

const loadPage = async () => {
    const response = await axios.get("https://www.cbe.org.eg/en/EconomicResearch/Statistics/Pages/ExchangeRatesListing.aspx");
    const html = response.data;
    const $ = cheerio.load(html);
    let bag = [];
    $('.table tr td').each((index, element) => {
        bag.push($(element).text());
    });
    
   const day = $('.date').text();
   console.log(day,'Buy: ',bag[1],'Sell: ',bag[2]);

};

cron.schedule('*/2 * * * *', () => {
    loadPage();
  });
