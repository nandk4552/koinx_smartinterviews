const axios = require("axios");
const cryptoModel = require("../models/cryptoModel");
require("dotenv").config();

const fetchCryptoData = async () => {
  try {
    const coins = ["bitcoin", "matic-network", "ethereum"];
    const url = `${process.env.COINGECKO_API_URL}/simple/price?ids=${coins.join(
      ","
    )}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

    const { data } = await axios.get(url);

    for (const coin of coins) {
      const {
        usd: price,
        usd_market_cap: marketCap,
        usd_24h_change: change24h,
      } = data[coin];

      /***
       * currently saving historical data in a new doc in mongodb 
       * [ for task 3: (standard deviation of the price of the requested cryptocurrency for the last 100 records stored) ]
       */

      const cryptoData = new cryptoModel({
        coinId: coin,
        price,
        marketCap,
        change24h,
      });

      await cryptoData.save();
    }

    console.log("Crypto Synced and saved to the database.");
    
  } catch (err) {
    console.error("Error fetching crypto data from COINGECKO API:", err);
  }
};

module.exports = fetchCryptoData;
