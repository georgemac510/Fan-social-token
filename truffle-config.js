/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

 const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();
// const providerURL = fs.readFileSync(".providerURL").toString();

require('dotenv').config();
const mnemonic = process.env["MNEMONIC"];
const infuraProjectId = process.env["INFURA_PROJECT_ID"];

module.exports = {  /**
  * contracts_build_directory tells Truffle where to store compiled contracts
  */
  contracts_build_directory: './build/ethereum-contracts',

  /**
  * contracts_directory tells Truffle where the contracts you want to compile are located
  */
  contracts_directory: './contracts/ethereum',

  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

   networks: {
     development: {
       host: "127.0.0.1",     // Localhost (default: none)
       port: 8545,            // Standard Ethereum port (default: none)
       network_id: "*",       // Any network (default: none)
     },

     rinkeby:  {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: mnemonic
        },
        providerOrUrl:
         `https://rinkeby.infura.io/v3/${infuraProjectId}`
      }),
      network_id: 4,          // Rinkeby's network id
      gas: 5500000,        
    },

      optimism: {
        provider: () => new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic
          }, 
          providerOrUrl:
          `https://optimism-mainnet.infura.io/v3/${infuraProjectId}`
        }),
        network_id: 10,
      },
      // for testnet
      'optimism-kovan': {
        provider: () => new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic
          }, 
          providerOrUrl:
          `https://optimism-kovan.infura.io/v3/${infuraProjectId}`
        }),
        network_id: 69,
      },
      // for the local dev environment
      'optimism-local': {
        provider: () => {
          return new HDWalletProvider('test test test test test test test test test test test junk', 'http://localhost:8545')
        },
        network_id: 420
      }
    },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.2",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Truffle DB is enabled in this project by default. Enabling Truffle DB surfaces access to the @truffle/db package
  // for querying data about the contracts, deployments, and networks in this project
  db: {
    enabled: true
  }
};