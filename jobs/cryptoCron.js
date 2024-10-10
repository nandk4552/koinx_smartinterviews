const fetchCryptoData = require("../services/cryptoService");
const cron = require("node-cron");

//* schedule a task to run every 2 hours and fetch the latest data from the API
const startCronJob = () => {
  // 30sec for testing purposes only
  // cron.schedule("*/30 * * * * *", () => {
  cron.schedule("0 */2 * * *", () => {
    console.log("Running cron job to fetch cryptocurrency data.");
    fetchCryptoData();
  });
};

module.exports = startCronJob;
