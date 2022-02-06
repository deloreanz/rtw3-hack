import { Contract, providers } from 'ethers';
import NftBet from '../evm/artifacts/contracts/main.sol/NftBet.json';

export default ({ contractAddress, networkId, loginProvider,}) => {
  console.log('loginprovider', loginProvider);
  return new Contract(contractAddress, NftBet.abi, loginProvider);
};