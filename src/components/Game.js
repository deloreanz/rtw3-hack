import React, {Component} from 'react';
import Button from '@mui/material/Button';
import Modal from './Modal';
import './Modal.css';
import './Game.css';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
const Input = styled('input')({
  display: 'none',
});

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
        <Button variant="outlined" onClick={e => this.modalOpen(e)}>Start New Game</Button>
        
        {this.state.modal && <Modal handleClose={(e) => this.modalClose(e)}>
          <h2>New Game</h2>
          <div className="form-group">
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={this.state.modalInputName}
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

};

export default Game;