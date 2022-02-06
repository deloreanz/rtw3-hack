import React from 'react';
import { useEffect, useState } from 'react';
import Header from "./components/Header";
import Game from './components/Game';
import './App.css';
import ActiveGames from './components/Active';
import { useWallet } from './providers/WalletProvider.js';



  
function App() {
  const result = useWallet();
  console.log(result);
  // const { loginProvider, signer, address, account, accounts, connect, isConnected, balances: coinBalances, network, networkType, networkId, getNetwork } = useWallet();
  
  return (
    <div className="App">
      <Header />
      <Game />
      <ActiveGames></ActiveGames>
    </div>
  );
}

export default App;