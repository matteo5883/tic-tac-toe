import React from 'react';
import '../../css/common.css';
import '../../css/board.css';
import Square from './functionals/square';

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null)
        }
    }

    componentDidUpdate() {
        if (this.props.resetGameState) {
            this.setState({
                squares: Array(9).fill(null)
            });
            this.props.updateSymbol('X');
            this.props.resetGameFunction(false);
        }
    }

    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            setValue={() => this.setValue(i)}
        />;
    }

    setValue = (i) => {
        const squares = this.state.squares.slice();
        if (squares[i] === null) {
            squares[i] = this.props.nextSymbol;
            this.setState({
                squares: squares
            })
        }
        this.props.updateSymbol(this.props.nextSymbol === 'O' ? 'X' : 'O');
        this.checkVictory(squares, squares[i]);
    }

    checkVictory = (squares, symbol) => {
        let rows = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < rows.length; i++) {
            const [a, b, c] = rows[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                this.props.declareWinner(symbol);
            }
        }
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