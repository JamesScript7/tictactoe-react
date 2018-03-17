import React from 'react';

// This is a functional component:
// Creates each square cell and attached onClick event listener.
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
