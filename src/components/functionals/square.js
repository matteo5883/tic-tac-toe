import React from "react";

const square = props => {
  return (
    <button className="square" onClick={props.setValue}>
      {props.value}
    </button>
  );
};
export default square;
