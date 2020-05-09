import React from 'react';

import { Container, Row, Col, Button } from "react-bootstrap";

const pregame = props => {

    return (
        <Container className="popup-container">
            <Row>
                <h1>INSERT PLAYERS</h1>
            </Row>
            <Row>
                <Col>
                    <span>Player 1: </span>
                </Col>
                <Col>
                    <input placeholder="insert name" value={props.player1}
                        onChange={(event) => props.setPlayer1(event.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <span>Player 2: </span>
                </Col>
                <Col>
                    <input placeholder="insert name" value={props.player2}
                        onChange={(event) => props.setPlayer2(event.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Button className="startGame" onClick={props.startGame}>START</Button>
            </Row>
        </Container>
    )
}
export default pregame;