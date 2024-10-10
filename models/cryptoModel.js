const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: [true, "please provide a coin"],
    enum: ["bitcoin", "matic-network", "ethereum"],
    index: true,
  },
  price: { type: Number, required: [true, "please provide price"] },
  marketCap: { type: Number, required: [true, "please provide marketcap"] },
  change24h: { type: Number, required: [true, "please provide changed price in 24h"] },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Crypto", cryptoSchema);
