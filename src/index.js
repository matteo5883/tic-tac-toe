import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Pregame from './js/components/functionals/pregame';
import Game from './js/components/Game'
import './css/common.css';
class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 1,
            player1: '',
            player2: ''
        }
    }

    setPlayer1 = name => {
        this.setState({player1: name})
    }

    setPlayer2 = name => {
        this.setState({player2: name})
    }

    startGame = () => {
        this.setState({page: 2})
    }

    newGame = () => {
        this.setState({
            page: 1,
            player1: '',
            player2: ''
        })
    }

    render() {
        const component =  this.state.page === 1 ?
                <Pregame 
                    startGame={this.startGame} 
                    setPlayer1={this.setPlayer1}
                    setPlayer2={this.setPlayer2}    
                    player1={this.state.player1}
                    player2={this.state.player2}                    
                />
                :
                <Game 
                    player1={this.state.player1}
                    player2={this.state.player2}
                    closeGame={this.newGame}
                />
        
        return component;
        
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);