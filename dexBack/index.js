const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;
import('node-fetch').then(nodeFetch => {
  fetch = nodeFetch;
  // rest of your code that uses fetch
});


app.use(cors());
app.use(express.json());

app.get("/tokenPrice", async (req, res) => {
  let fetch;
  const nodeFetch = await import('node-fetch');
  fetch = nodeFetch.default;
  const {query} = req;

  const responseOne = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressOne
  })

  const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressTwo
  })

  const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await response.json();
  const usdToInrRate = data.rates.INR;
const usdToJpyRate = data.rates.JPY;
const usdToKrwRate = data.rates.KRW;
const usdToSgdRate = data.rates.SGD;
const usdToMyrRate = data.rates.MYR;
const usdToIdrRate = data.rates.IDR;

const usdPrices = {
  tokenOne: responseOne.raw.usdPrice,
  tokenTwo: responseTwo.raw.usdPrice,
  ratio: responseOne.raw.usdPrice/responseTwo.raw.usdPrice
}

  const inrPrices = {
    tokenOne: usdPrices.tokenOne * usdToInrRate,
    tokenTwo: usdPrices.tokenTwo * usdToInrRate,
    ratio: usdPrices.ratio // This ratio remains the same as it's a relative value
  }

  const sgdPrices = {
    tokenOne: usdPrices.tokenOne * usdToSgdRate,
    tokenTwo: usdPrices.tokenTwo * usdToSgdRate,
    ratio: usdPrices.ratio
  }
  
  const myrPrices = {
    tokenOne: usdPrices.tokenOne * usdToMyrRate,
    tokenTwo: usdPrices.tokenTwo * usdToMyrRate,
    ratio: usdPrices.ratio
  }
  
  const idrPrices = {
    tokenOne: usdPrices.tokenOne * usdToIdrRate,
    tokenTwo: usdPrices.tokenTwo * usdToIdrRate,
    ratio: usdPrices.ratio
  }

const jpyPrices = {
  tokenOne: usdPrices.tokenOne * usdToJpyRate,
  tokenTwo: usdPrices.tokenTwo * usdToJpyRate,
  ratio: usdPrices.ratio // This ratio remains the same as it's a relative value
}

const krwPrices = {
  tokenOne: usdPrices.tokenOne * usdToKrwRate,
  tokenTwo: usdPrices.tokenTwo * usdToKrwRate,
  ratio: usdPrices.ratio // This ratio remains the same as it's a relative value
}

  
  return res.status(200).json(usdPrices);
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
