const calculateStandardDeviation = (prices) => {
  // calculate average of the prices
  const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
  // squared differences from the mean for each price
  const squaredDiffs = prices.map((price) => Math.pow(price - mean, 2));
  // variance by taking the average of the squared differences
  const variance =
    squaredDiffs.reduce((acc, diff) => acc + diff, 0) / squaredDiffs.length;
  // standard deviation is the square root of the variance
  return Math.sqrt(variance);
};

module.exports = { calculateStandardDeviation };
