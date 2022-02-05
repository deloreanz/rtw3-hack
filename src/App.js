import React, {Component} from 'react';
import Header from "./components/Header";
import Game from './components/Game';
import './App.css';
import ActiveGames from './components/Active';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Game />
        <ActiveGames></ActiveGames>
      </div>
    );
  }
}
export default App;