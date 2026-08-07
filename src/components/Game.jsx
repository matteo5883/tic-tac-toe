import React from 'react';
import '../css/game.css';
import Board from './Board';
import Popup from './functionals/popup';
import DrawPopup from './functionals/drawPopup';

class Game extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        showPopup: false,
        winner: '',
        resetGame: false,
        nextSymbol: 'X'
      }
    }

    //calculate name of winner player and set state
    renderWinner = (symbol) => {
      const player1 = this.props.player1 === '' ? 'X' : this.props.player1;
      const player2 = this.props.player2 === '' ? 'O' : this.props.player2;
      const player = symbol === 'X' ? player1 : player2;
      this.setState({
        showPopup: true,
        winner: player
      })
    }

    //set reset field. If true the play will restart with same settings
    resetGame = (bool) => {
      this.setState({
        resetGame: bool
      });
    }

    //reset all the parameters
    newGame = () => {
      this.setState({
        showPopup: false,
        winner: '',
        resetGame: true
      })
    }

    //toggle symbol
    updateSymbol = sym => {
      this.setState({
        nextSymbol: sym
      })
    }

    //set showPopup = true but don't set winner param
    declareDraw = () => {
      this.setState({
        showPopup: true
      })
    }

    render() {
      const player1 = this.props.player1 === '' ? 'X' : this.props.player1;
      const player2 = this.props.player2 === '' ? 'O' : this.props.player2;
      let status = 'Next player: ' + (this.state.nextSymbol === 'X' ? player1 : player2);
      return (
        <div className = "game">
          <div className = "game-board">
            <div className = "status">{status}</div>
            <Board nextSymbol = {this.state.nextSymbol}
                  updateSymbol = {this.updateSymbol}
                  declareWinner = {this.renderWinner}
                  resetGameFunction = {this.resetGame}
                  resetGameState = {this.state.resetGame}
                  declareDraw = {this.declareDraw}
                  />
          </div>
          {this.state.showPopup &&
            (this.state.winner ?
              <Popup winner = {this.state.winner}
                newGame = {this.newGame}
                closeGame = {this.props.closeGame}
                />
              :
              <DrawPopup newGame = {this.newGame}
              closeGame = {this.props.closeGame}
              />
            )
          }
        </div>
      );
    }
}
export default Game;
