import React from 'react';

import { Container, Row, Col, Button } from "react-bootstrap";
import logo from '../../resources/sfondo_1.png';

const pregame = props => {

    return (
        <Container className="game" style={{backgroundImage:`url(${logo})`}}>
            <Row>
                <h1>INSERT PLAYERS</h1>
            </Row>
            <Row>
                <Col xs='4' className='text-right'>Player 1:</Col>
                <Col xs='6'>
                    <input placeholder="insert name" value={props.player1}
                        onChange={(event) => props.setPlayer1(event.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs='4' className='text-right'>Player 2:</Col>
                <Col xs='6'>
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