import React, {Component} from 'react';
import Button from '@mui/material/Button';
import Modal from './Modal';
import './Modal.css';
import './Game.css';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


class Game extends Component {
  
  constructor() {
    super();
    this.state = {
      modal: false,
      name: "",
      modalInputName: ""
    };
    
    
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    this.setState({ name: this.state.modalInputName });
    this.modalClose();
  }

  modalOpen() {
    this.setState({ modal: true });
    console.log(this.state);
  }

  modalClose() {
    this.setState({
      modalInputName: "",
      modal: false
    });
  }

  render() {
    return (
      <div className="body">

      </div>
    );
  }

};

export default Game;