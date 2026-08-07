import React from "react";
import Pregame from "./functionals/pregame";
import Game from "./Game";
import "../css/common.css";
import "bootstrap/dist/css/bootstrap.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      player1: "",
      player2: ""
    };
  }

  setPlayer1 = name => {
    this.setState({player1: name});
  };

  setPlayer2 = name => {
    this.setState({player2: name});
  };

  startGame = () => {
    this.setState({page: 2});
  };

  //set the state to the initial. Render the 'pregame' page
  newGame = () => {
    this.setState({
      page: 1,
      player1: "",
      player2: ""
    });
  };

  render() {
    const component =
      this.state.page === 1 ? (
        <Pregame
          startGame={this.startGame}
          setPlayer1={this.setPlayer1}
          setPlayer2={this.setPlayer2}
          player1={this.state.player1}
          player2={this.state.player2}
        />
      ) : (
        <Game
          player1={this.state.player1}
          player2={this.state.player2}
          closeGame={this.newGame}
        />
      );

    return component;
  }
}
export default Main;
