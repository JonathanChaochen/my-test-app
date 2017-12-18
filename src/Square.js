import React from 'react';

function Square(props) {
  const win = props.winner ? ' win' : '';
  return (
    <button className={`square${win}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
