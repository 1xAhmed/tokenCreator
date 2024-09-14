import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "hardhat-deploy";
dotenv.config();

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
          {
            version: '0.8.20',
            settings: {
              viaIR: true,
              optimizer: {
                enabled: true,
                runs: 2000,
              },
            },
          }
        ],
      },
    networks: {
        // Ethereum mainnet
        mainnet: {
            url: process.env.MAINNET_RPC_URL || "",
            accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        },
        // Goerli testnet
        sepolia: {
            url: process.env.SEPOLIA_RPC_URL || "",
            accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        },
    },
    etherscan: {
        apiKey: {
            mainnet: process.env.ETHERSCAN_API_KEY,
            sepolia: process.env.ETHERSCAN_API_KEY,
            ethernity: ""
        },
        // customChains: [
        //     {
        //         network: "sepolia",
        //         chainId: 11155111,
        //         urls: {
        //             apiURL: "https://api.routescan.io/v2/network/testnet/evm/11155111/etherscan",
        //             browserURL: "https://11155111.testnet.localhost:8080"
        //         }
        //     }
        // ]
    },
    namedAccounts: {
        deployer: {
            default: 0, // Here 0 means the first account in the list of accounts
        },
    },
};

export default config;
