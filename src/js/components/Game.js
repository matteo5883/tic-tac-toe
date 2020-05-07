import React from 'react';
import '../../css/common.css';
import '../../css/game.css';
import Board from './Board';
import Popup from './functionals/popup';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showWinner: false,
            winner: '',
            resetGame: false,
            nextSymbol: 'X'
        }
    }

    renderWinner = (symbol) => {
        const player1 = this.props.player1 === '' ? 'X' : this.props.player1;
        const player2 = this.props.player2 === '' ? 'O' : this.props.player2;
        const player = symbol === 'X' ? player1 : player2;
        this.setState({
            showWinner: true,
            winner: player
        })
    }

    resetGame = (bool) => {
        this.setState({ resetGame: bool });
    }

    newGame = () => {
        this.setState({
            showWinner: false,
            winner: '',
            resetGame: true
        })
    }

    updateSymbol = sym => {
        this.setState({
            nextSymbol: sym
        })
    }

    render() {
        const player1 = this.props.player1 === '' ? 'X' : this.props.player1;
        const player2 = this.props.player2 === '' ? 'O' : this.props.player2;
        let status = 'Next player: ' + (this.state.nextSymbol === 'X' ? player1 : player2);
        return (
            <div className="game">
                <div className="game-board">
                    <div className="status">{status}</div>
                    <Board
                        nextSymbol={this.state.nextSymbol}
                        updateSymbol={this.updateSymbol}
                        declareWinner={this.renderWinner}
                        resetGameFunction={this.resetGame}
                        resetGameState={this.state.resetGame}
                    />
                </div>
                {this.state.showWinner &&
                    <Popup
                        winner={this.state.winner}
                        newGame={this.newGame}
                        closeGame={this.props.closeGame}
                    />}
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}
export default Game;