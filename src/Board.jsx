import React, { Component } from 'react';

// COMPONENTS:
import Square from './Square';

// Helper function that finds out if there is a winner.
function calcWinner(squares) {
  const lines = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
  ];

  for (let i = 0; i < lines.length; i++) {
    // New way to set variables.
    const [a,b,c] = lines[i];

    // Asks does square[a] have value? if it does then does the combination evals to true.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  // 1. Gets the this.state.squares array and makes a copy (important!)
  // 2. Makes it equal 'X' or 'O'.
  // 3. Sets new array with updated 'X' or 'O' from original null value.
  handleClick(i) {
    const squares = this.state.squares.slice();

    // Returns early and ignore the click if:
    // 1. someone won
    // 2. if square is filled.
    if (calcWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  // Value is 'X', 'O', or null
  // onClick is automatically bound if you use '() =>'
  renderSquare(i) {
    return <Square value={this.state.squares[i]}
                   onClick={() => this.handleClick(i)}
           />;
  }

  render() {
    const winner = calcWinner(this.state.squares);
    let status;

    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
