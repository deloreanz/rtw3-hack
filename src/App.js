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


const Input = styled('input')({
  display: 'none',
});
  
const App = () => {
  const { loginProvider, signer, address, account, accounts, connect, isConnected, balances: coinBalances, network, networkType, networkId, getNetwork } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameName, setGameName] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [onDate, setOnDate] = useState('');
  const [sign, setSign] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const formValues = {
    gameName: gameName,
    networkName: network,
    contractAddress: contractAddress, 
    onDate: onDate, 
    sign: sign,
    priceValue: priceValue
  }

  const handleSubmit = (e) => {
    console.log('handle submit');
    console.log(formValues);
    // this.setState({ name: this.state.modalInputName });
    // this.modalClose();
  }

  

  return (
    <div className="App">
      <Header setIsModalOpen={setIsModalOpen} />
      <Game />

      {isModalOpen && 
        <Modal
          handleClose={e => {
            setIsModalOpen(false);
            setGameName('');
            setNetworkName('');
            setContractAddress('');
            setOnDate('');
            setSign('');
            setPriceValue('');
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
              <label>Network:</label>
            </Grid>
            <Grid xs={11} item>
                <input
                  type="text"
                  name="modalInputName"
                  className="form-control"
                  value={networkName}
                  onChange={e => {
                    console.log('setting networkName = ' + e.target.value);
                    setNetworkName(e.target.value);
                  }}
                />
            </Grid>
            <Grid xs={1} item>
              <label>Address:</label>
            </Grid>
            <Grid xs={11} item>
                <input
                  type="text"
                  name="modalInputName"
                  className="form-control"
                  value={contractAddress}
                  onChange={e => {
                    console.log('setting contractAddress = ' + e.target.value);
                    setContractAddress(e.target.value);
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
            <Grid xs={3} item>
              <label>Floor price:</label>
            </Grid>
            <Grid xs={1} item>
                <input
                  type="text"
                  name="modalInputName"
                  className="form-control"
                  value={sign}
                  onChange={e => {
                    console.log('setting sign = ' + e.target.value);
                    setSign(e.target.value);
                  }}
                />
            </Grid>
            <Grid xs={6} item>
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