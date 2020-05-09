import React from "react";
import "../css/board.css";
import Square from "./functionals/square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    };
  }

  //check if the game has to be restarted
  componentDidUpdate() {
    if (this.props.resetGameState) {
      this.setState({
        squares: Array(9).fill(null)
      });
      this.props.updateSymbol("X");
      this.props.resetGameFunction(false);
    }
  }

  //render the single cell
  renderSquare(i) {
    return (
      <Square value={this.state.squares[i]} setValue={() => this.setValue(i)} />
    );
  }

  //set the value of the 'i'-th cell. If the cell is already set it do nothing
  setValue = i => {
    const squares = this.state.squares.slice();
    if (squares[i] === null) {
      squares[i] = this.props.nextSymbol;
      this.setState({
        squares: squares
      });
      this.props.updateSymbol(this.props.nextSymbol === "O" ? "X" : "O");
      this.checkVictory(squares, squares[i]);
    }
  };

  //check every possible combination and if there are 3 cells equals each other call the method 'declareWinner'
  checkVictory = (squares, symbol) => {
    let rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let win = false;
    rows.map(row => {
      win =
        win ||
        (squares[row[0]] &&
          squares[row[0]] === squares[row[1]] &&
          squares[row[0]] === squares[row[2]]);
    });
    if (win) this.props.declareWinner(symbol);
    if(this.checkMovesEnd(squares) && !win) this.props.declareDraw();
  };

  //check if all the cells all filled
  checkMovesEnd = (squares) => {
    let allCellsFilled = true;
    squares.map(el => allCellsFilled = allCellsFilled && el !== null);
    return allCellsFilled;
  }

  render() {
    return (
      <div className="board">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
export default Board;
