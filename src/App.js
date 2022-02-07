import React from 'react';
import { useEffect, useState } from 'react';
import Header from "./components/Header";
import Game from './components/Game';
import './App.css';
import ActiveGames from './components/Active';
import { useWallet } from './providers/WalletProvider.js';
import Button from '@mui/material/Button';
import Modal from './components/Modal';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Grid from '@mui/material/Grid';
import betContract from './libs/betContract';

const Input = styled('input')({
  display: 'none',
});

const chainlinkProviders = [

];
  
const App = () => {
  const { loginProvider, signer, address, account, accounts, connect, isConnected, balances: coinBalances, network, networkType, networkId, getNetwork } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameName, setGameName] = useState('');
  const [inputNetworkId, setInputNetworkId] = useState('');
  const [collectionAddress, setCollectionAddress] = useState('');
  const [onDate, setOnDate] = useState('');
  const [sign, setSign] = useState('');
  const [gameSymbol, setGameSymbol] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [walletDetails, setWalletDetails] = useState({})
  const [nftBet, setNftBet] = useState(null);

  const formValues = {
    gameName: gameName,
    gameSymbol: gameSymbol,
    networkId: inputNetworkId,
    collectionAddress: collectionAddress, 
    onDate: onDate,
    sign: sign,
    priceValue: priceValue
  }

  useEffect(() => {
    if (!address || !loginProvider || !signer || !account) return;
    setWalletDetails({
      loginProvider: loginProvider,
      signer: signer,
      address: address, 
      account: account
    });
  }, [address, loginProvider, signer, account]);

  useEffect(() => {
    if (!loginProvider || !signer) return;
    const bettingContractAddress = "0xfc66f1872958cb671c9D39B57879DA4181EaC94F"
    const contract = betContract({ contractAddress: bettingContractAddress, networkId, loginProvider: signer });
    setNftBet(contract);
  }, [loginProvider, signer]);

  const handleSubmit = (e) => {
    console.log('formvalues: ', formValues);
    // if (formValues.contractAddress && 
    //   formValues.gameName && 
    //   formValues.networkName && 
    //   formValues.onDate) {
      var isTrueSet = (sign === 'true');
      const isCreated = nftBet.createGame(formValues.gameName, formValues.gameSymbol, formValues.networkId, formValues.collectionAddress, formValues.onDate, formValues.priceValue, isTrueSet);
      isCreated.then((val) => {
          console.log('val: ', val);
        }, err => {
          console.log('err: ', err);
        });
      
      // pollForGames();
  }

  const pollForGames = () => {
    const gamesMap = nftBet.gameArray("0");
    gamesMap.then((game) => {
      console.log('game: ', game);
    })
    console.log('gamesMap: ', gamesMap);
  }
  


  return (
    <div className="App">
      <Header setIsModalOpen={setIsModalOpen} walletDetails={walletDetails}/>
      <Game />

      {isModalOpen && 
        <Modal
          handleClose={e => {
            setIsModalOpen(false);
            setGameName('');
            setInputNetworkId('');
            setCollectionAddress('');
            setOnDate('');
            setSign('');
            setPriceValue('');
            setGameSymbol('');
          }}
        >
          <Grid container spacing={2} justify="space-around">
            <Grid xs={12} item>
              <h2>Create New Price Bet</h2>
            </Grid>
            <Grid xs={1} item>
              <label>Name:</label>
            </Grid>
            <Grid xs={11} item>
              <input
                type="text"
                name="modalInputName"
                className="form-control"
                value={gameName}
                onChange={e => {
                  console.log('setting gameName = ' + e.target.value);
                  setGameName(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={1} item>
              <label>Game Symbol:</label>
            </Grid>
            <Grid xs={11} item>
              <input
                type="text"
                name="modalInputName"
                className="form-control"
                value={gameSymbol}
                onChange={e => {
                  console.log('setting gameName = ' + e.target.value);
                  setGameSymbol(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={1} item>
              <label>Network Id:</label>
            </Grid>
            <Grid xs={11} item>
                <input
                  type="text"
                  name="modalInputName"
                  className="form-control"
                  value={inputNetworkId}
                  onChange={e => {
                    console.log('setting networkName = ' + e.target.value);
                    setInputNetworkId(e.target.value);
                  }}
                />
            </Grid>
            <Grid xs={1} item>
              <label>Collection Address:</label>
            </Grid>
            <Grid xs={11} item>
                <input
                  type="text"
                  name="modalInputName"
                  className="form-control"
                  value={collectionAddress}
                  onChange={e => {
                    console.log('setting collectionAddress = ' + e.target.value);
                    setCollectionAddress(e.target.value);
                  }}
                />
            </Grid>
            <Grid xs={1} item>
              <label>Date:</label>
            </Grid>
            <Grid xs={11} item>
                <input
                  type="date"
                  name="modalInputName"
                  className="form-control"
                  value={onDate}
                  onChange={e => {
                    console.log('setting onDate = ' + e.target.value);
                    setOnDate(e.target.value);
                  }}
                />
            </Grid>
            <Grid xs={1} item>
              <label>Is Greater than:</label>
            </Grid>
            <Grid xs={11} item>
                <select name='display_address' onChange={e => {
                    console.log('setting sign = ' + e.target.value);
                    setSign(e.target.value);
                  }} >
                    <option value={sign} selected>Choose here</option>
                    <option value={true}>True</option>
                    <option value={false}>false</option>                    
                </select>
            </Grid>
            <Grid xs={1} item>
              <label>Floor Price</label>
            </Grid>
            <Grid xs={11} item>
                <input
                  type="text"
                  name="modalInputName"
                  className="form-control"
                  value={priceValue}
                  onChange={e => {
                    console.log('setting priceValue = ' + e.target.value);
                    setPriceValue(e.target.value);
                  }}
                />
            </Grid>
            <Grid xs={12} item>
            <div className="form-group">
              <Button variant="contained" onClick={(e) => handleSubmit(e)}>
                Mint NFT
              </Button>
            </div>
            </Grid>
          </Grid>
        </Modal>
      }

    </div>
  );
}

export default App;