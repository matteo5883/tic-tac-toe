import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/popup.css";
import logo from '../../resources/game_over.png';

const drawPopup = props => {
  return (
    <div className="popup">
      <Container fluid className="popup_inner">
        <Row>
          <img className="margin-auto width200" src={logo} alt="" />
        </Row>
        <Row>
          <Col className="text-center">
            <div className="margin-auto">
              <button className="popup-button" onClick={props.newGame}>New Game</button>
            </div>
          </Col>
          <Col className="text-center">
            <button className="popup-button" onClick={props.closeGame}>Close</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default drawPopup;
