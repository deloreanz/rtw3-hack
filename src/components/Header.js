import React from "react";
import './Header.css';
import logo from '../logo-risk.png';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

const Header = ({ setIsModalOpen }) => {

  const data = "This is data from Child Component to the Parent Component."

  // const modalOpen = (e) => {
  //   // this.setState({ modal: true });
  //   console.log("hello", e);
  // }

  return (
    <header className="header">
      <Grid className="header-container" container spacing={2}>
        <Grid item xs={8}>
          <div className="logo-container">
            <img className="logo" src={logo} alt="Logo" />;
          </div>
        </Grid>
        <Grid item xs={4}>
          <div>
            <Button variant="outlined" onClick={e => setIsModalOpen(true)}>Start New Game</Button>
          </div>
        </Grid>
      </Grid>
    </header>
  );
}

export default Header