

const axios = require('axios');
const cheerio = require('cheerio');
bionifyHTML

const websiteUrl = 'https://www.sapo.pt'; // Replace with the target website URL

axios.get(websiteUrl)
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      // Extract data using Cheerio selectors
      const title = $('title').text();
      const paragraphs = $('p').map((index, element) => $(element).text()).get();

      console.log('Title:', title);
      console.log('Paragraphs:', paragraphs);
    } else {
      console.error('Error: Unable to fetch the web page.');
    }
  })
  .catch((error) => {
    console.error('Error fetching HTML:', error);
  });