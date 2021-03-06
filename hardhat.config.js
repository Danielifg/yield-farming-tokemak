require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("solidity-coverage");

const CHAIN_IDS = {
  hardhat: 31337, // chain ID for hardhat testing
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
    ],
  },
  networks: {
    localhost: { url: "http://127.0.0.1:8545" },
    matic: {
      url: `https://twilight-icy-log.matic.quiknode.pro/${process.env.QUICK_NODE_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    "mainnet-fork": {
      url: "http://127.0.0.1:8545",
      accounts:
      [
         process.env.TEST_ETH_ACCOUNT_PRIVATE_KEY
    ],

      blockNumber: 12903088, // since pool deployment
      chainId:31337,
    },
    hardhat: {
      chainId: CHAIN_IDS.hardhat,
      forking: {
        // Using Alchemy
        url: `https://eth-mainnet.alchemyapi.io/v2/OlIDDqLH9Uo3AUQ_0ezj6sfqHIGxJRxw`, 
        blockNumber: 12903088 // since pool deployment
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  plugins: ["solidity-coverage"],
};
