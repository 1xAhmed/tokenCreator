import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
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
      etherscan: {
        apiKey: {
          ernscan: "ethernity_chain", // apiKey is not required, just set a placeholder
        },
        customChains: [
          {
            network: "ethernity_chain",
            chainId: 233,
            urls: {
              apiURL: "https://api.routescan.io/v2/network/testnet/evm/233/etherscan",
              browserURL: "https://testnet.ernscan.io"
            }
          }
        ]
      },
      networks: {
        ethernity_chain: {
          url: 'https://testnet.ethernitychain.io',
          accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        },
      },
    sourcify: {
      enabled: true
    },
    namedAccounts: {
        deployer: {
            default: 0, // Here 0 means the first account in the list of accounts
        },
    },
};

export default config;
