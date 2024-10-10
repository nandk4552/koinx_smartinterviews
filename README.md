# Koinx Assessment - Node.js, Expres js & MongoDB
This project is a Node.js application that fetches cryptocurrency data (price, market cap, and 24-hour change) only for Bitcoin, Matic, and Ethereum using CoinGecko API and stores it in a MongoDB database. The data is updated every 2 hours through a cron job. It also provides APIs to fetch the latest cryptocurrency data and calculate the standard deviation of the price over the last 100 records.
==================================================
## Features

- Fetches cryptocurrency data for Bitcoin, Matic, and Ethereum every 2 hours using a cron job.

-Provides APIs to:
    - Get the latest price, market cap, and 24-hour change for a cryptocurrency.
    - Calculate the standard deviation of the price for the last 100 records of a cryptocurrency.
===================================================
## API Endpoints

### 1. Get Latest Cryptocurrency Stats

**Endpoint:** `GET /api/v1/crypto/stats`

**Description:** Returns the latest price, market cap, and 24-hour change for a cryptocurrency.

**Query Parameters:**

| Parameter | Type   | Description                                                                 |
|-----------|--------|-----------------------------------------------------------------------------|
| `coin`    | String | The cryptocurrency to fetch (e.g., `bitcoin`, `matic-network`, or `ethereum`). |

**Example Request:**
 
```bash
GET http://localhost:8080/api/v1/crypto/stats?coin=bitcoin
```

Sample Response:

```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

### 2. Get Standard Deviation of Price for Last 100 Records
**Endpoint:** `GET /api/v1/crypto/deviation`
**Description:** Returns the standard deviation of the price for the last 100 records stored in the database for a cryptocurrency.

**Query Parameters:**

| Parameter | Type   | Description                                                                 |
|-----------|--------|-----------------------------------------------------------------------------|
| `coin`    | String | The cryptocurrency to fetch (e.g., `bitcoin`, `matic-network`, or `ethereum`). |

GET
```bash
http://localhost:8080/api/v1/crypto/deviation?coin=bitcoin
```
Sample Response:

```json
{
  "deviation": 4082.48
}
```
===================================================================

How It Works

*Task 1*. A background job (cron job) runs every 2 hours, fetching data for Bitcoin, Matic, and Ethereum from the CoinGecko API.
The fetched data includes the current price, market cap, and 24-hour change.
This data is stored in MongoDB under the appropriate cryptocurrency collection.

*Task 2*. The /stats API returns the latest stored data for a requested cryptocurrency.

*Task 3*. The /deviation API calculates and returns the standard deviation of the price over the last 100 records for a requested cryptocurrency.

==================================================================
### Project Structure

```bash
├── config/
│   ├── db.js              # MongoDB connection setup
├── controllers/
│   ├── cryptoController.js # Controller for handling /stats and /deviation API
├── jobs/
│   ├── cryptoCron.js      # Job that fetches cryptocurrency data
├── models/
│   ├── cryptoModel.js     # MongoDB schema for storing cryptocurrency data
├── routes/
│   ├── cryptoRoutes.js     # Routes for /stats and /deviation API
├── services/
│   ├── cryptoServices.js # to fetch crypto prices from coingecko API
├── utils/
│   ├── cryptoHelper.js     # helper function to calculate standard deviation
├── server.js              # Entry point for the application
├── .env # env variables
├── README.md              # Project documentation
```
====================================================================
### Getting Started

* Prerequisites 
Node.js (v14 or higher)
MongoDB (Local or MongoDB Atlas)
CoinGecko API (no authentication required)

Installation
Clone the repository:

```bash
git clone https://github.com/nandk4552/si-koinx.git
```
* Navigate to the project directory:

```bash
cd si-koinx
```
* Install dependencies:

```bash
npm install
```
* Set up environment variables: Create a .env file in the root directory and add the following variables:

```makefile
MONGO_URI=<your_mongodb_connection_string>
PORT=8080
COINGECKO_API_URL= <api_url_find_from_docs>
```
* Running the Application
Start the application:

```bash
npm start
```
================================================================
### Test the APIs using Postman:

Get cryptocurrency stats:
```bash
GET http://localhost:8080/api/v1/crypto/stats?coin=bitcoin
```

Get price deviation:
```bash
GET http://localhost:8080/api/v1/crypto/deviation?coin=bitcoin
```

* Testing Cron Job (for development)
For testing purposes, you can run the cron job every 30 seconds by modifying the cron expression in cronController.js:

```javascript
cron.schedule("*/30 * * * * *", () => {
  console.log("Running cron job to fetch cryptocurrency data.");
  fetchCryptoData();
});
```

Make sure to revert it to run every 2 hours after testing.

=====================================================

### Dependencies
Express.js - Web framework for Node.js
Mongoose - MongoDB object modeling tool
Node-cron - Task scheduling module
CoinGecko API - API for cryptocurrency prices