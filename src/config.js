export default {
    networks: {
      ethereum: {
        mainnet: {
          id: 1,
          name: 'Ethereum/Mainnet',
          providerUrl: 'https://mainnet.infura.io/v3/c5c672b375a64649849d05cab7a3ef01',
        },
        testnets: {
          goerli: {
            id: 5,
            name: 'Ethereum/Goerli',
            providerUrl: 'https://goerli.infura.io/v3/c5c672b375a64649849d05cab7a3ef01',
          },
          kovan: {
            id: 42,
            name: 'Ethereum/Kovan',
            providerUrl: 'https://kovan.infura.io/v3/c5c672b375a64649849d05cab7a3ef01',
          },
        },
      },
      polygon: {
        mainnet: {
          id: 137,
          name: 'Polygon/Mainnet',
          providerUrl: 'https://polygon-rpc.com',
          tokens: {
            'USDC': {
              address: '',
            },
          },
          contract: '',
        },
        testnets: {
          mumbai: {
            id: 80001,
            name: 'Polygon/Mumbai',
            // providerUrl: 'https://rpc-mumbai.matic.today',
            // providerUrl: 'https://rpc-endpoints.superfluid.dev/mumbai',
            providerUrl: 'https://rpc-mumbai.maticvigil.com',
            tokens: {
              'fUSDC': {
                address: '0xbe49ac1eadac65dccf204d4df81d650b50122ab2',
              },
            },
            contract: '0xE27bEDC7f48F7b5FDB1Bd34ec769A7f3FD7e863d',
          },
        },
      },
    },
  };