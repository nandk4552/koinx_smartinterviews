const cryptoModel = require("../models/cryptoModel");
const { calculateStandardDeviation } = require("../utils/cryptoHelper");
const validCoins = ["bitcoin", "ethereum", "matic-network"];

// * get the latest stats
const getLatestStats = async (req, res) => {
  try {
    // using Query params as mentioned in task description
    const { coin } = req.query;
    // validation
    if (!coin || !validCoins.includes(coin)) {
      return res.status(400).send({
        success: false,
        message:
          "Invalid coin name. It must be one of: bitcoin, ethereum, matic-network.",
      });
    }

    const latestData = await cryptoModel
      .findOne({ coinId: coin }, "price marketCap change24h") // fetching required fields
      .sort({ timestamp: -1 });

    if (!latestData) {
      return res.status(404).send({
        success: false,
        message: "Data not found for the requested coin.",
      });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in get latest stats API",
      err,
    });
  }
};
// * get the deviation of prices
const getPriceDeviation = async (req, res) => {
  try {
    // using Query params as mentioned in task description
    const { coin } = req.query;
    // validation
    if (!coin || !validCoins.includes(coin)) {
      return res.status(400).send({
        success: false,
        message:
          "Invalid coin name. It must be one of: bitcoin, ethereum, matic-network.",
      });
    }

    // to find coin and sort them in descending for latest 100 prices of requested coin
    const data = await cryptoModel.aggregate([
      { $match: { coinId: coin } }, // match the specified coin
      { $sort: { timestamp: -1 } }, // sort by timestamp
      { $limit: 100 }, //  last 100 entries
      {
        $group: {
          _id: null, // grouping by null to get a single document
          prices: { $push: "$price" }, // push prices into an array
        },
      },
    ]);

    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No data found for the requested coin.",
      });
    }
    // console.log("data===>", data); -> data is array of objects
    const prices = data[0].prices;

    const deviation = calculateStandardDeviation(prices);
    res.json({ deviation });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in get price deviation API",
      err,
    });
  }
};

module.exports = { getLatestStats, getPriceDeviation };
