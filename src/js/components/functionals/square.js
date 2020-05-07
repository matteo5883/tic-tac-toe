import React from 'react';
import '../../../css/common.css';

const square = (props) => {
    return (
        <button className="square" onClick={props.setValue}>
            {props.value}
        </button>
    );
}
export default square;