const axios = require('axios');
const fs = require('fs');
const tokenList = require('./tokenList.json');

async function fetchAndStoreTokenPrices() {
  try {
    // Fetch the prices for each token
    const prices = await Promise.all(tokenList.map(async (token) => {
      const response = await axios.get(`http://localhost:3001/tokenPrice?addressOne=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`);
      return {
        ...token,
        usdPrice: response.data.tokenOne,
      };
    }));

    // Write the prices to a file
    fs.writeFileSync('./tokenPrices.json', JSON.stringify(prices, null, 2));

    console.log('Token prices fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching and storing token prices:', error);
  }
}

fetchAndStoreTokenPrices();