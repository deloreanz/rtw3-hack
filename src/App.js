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


const Input = styled('input')({
  display: 'none',
});
  
const App = () => {
  const { loginProvider, signer, address, account, accounts, connect, isConnected, balances: coinBalances, network, networkType, networkId, getNetwork } = useWallet();
  const [modalOpen, setModalOpen] = useState('');

  const state = {
    modal: false,
    name: "",
    modalInputName: ""
  };
  
  const openModal = (isModalOpen) => {
    console.log('ismodalOpen', isModalOpen);
    setModalOpen(isModalOpen);
    state.modal = modalOpen
    console.log('modalOpen: ', modalOpen);
  }

  const modalClose = (isModalOpen) => {
    console.log('ismodalOpen', isModalOpen);
    setModalOpen(isModalOpen);
    state.modal = modalOpen
  }

  return (
    <div className="App">
      <Header openModal={openModal} />
      <Game />
      {modalOpen && <Modal handleClose={(e) => modalClose(false)}>
          <h2>New Game</h2>
          <div className="form-group">
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={state.modalInputName}
                name="modalInputName"
                onChange={(e) => this.handleChange(e)}
                className="form-control"
              />
            </div>
            <div>
              <label for="providers">Choose a provider:</label>

              <select name="providers" id="providers">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <Button variant="contained" disabled onClick={(e) => this.handleSubmit(e)}>
              Mint NFT
            </Button>
          </div>
          <div>
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" multiple type="file" />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
        </Modal>}
    </div>
  );
}

export default App;