import { Contract, providers } from 'ethers';
import NftBet from '../evm/artifacts/contracts/main.sol/NftBet.json';

export default ({ contractAddress, networkId, loginProvider,}) => {
  return new Contract(contractAddress, NftBet.abi, loginProvider);
};