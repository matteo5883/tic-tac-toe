import React from "react";

const square = props => {
  const style = props.className + " square";
  return (
    <button className={style} onClick={props.setValue}>
      {props.value}
    </button>
  );
};
export default square;
