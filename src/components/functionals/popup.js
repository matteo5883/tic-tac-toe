import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import "../../css/popup.css";

const popup = props => {
  return (
    <div className="popup">
      <Container fluid className="popup_inner">
        <Row>
          <h1>Winner: {props.winner}</h1>
        </Row>
        <Row>
          <Col className="text-center">
            <div className="margin-auto">
              <button onClick={props.newGame}>New Game</button>
            </div>
          </Col>
          <Col className="text-center">
            <button onClick={props.closeGame}>Close</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default popup;
