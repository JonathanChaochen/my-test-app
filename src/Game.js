import React, { Component } from 'react';
import Board from './Board';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          position: null,
        },
      ],
      xIsNext: true,
      stepNumber: 0,
      ascendingOrder: true,
    };
  }

  handleClick(i) {
    const locationOfMove = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // current is same as using this.state.stepNumber
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // return if someone already won the game
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares,
          position: locationOfMove[i],
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      // get the step from click move button
      stepNumber: step,
      // calculate the turn
      xIsNext: step % 2 === 0,
    });
  }

  toggleOrder() {
    this.setState({
      ascendingOrder: !this.state.ascendingOrder,
    });
  }

  render() {
    const { history } = this.state;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, index) => {
      const bold = index === this.state.stepNumber ? 'bold' : '';
      const desc = index
        ? `Go to move # ${index}, Position: (${step.position})`
        : 'Go to game Start';
      return (
        <li key={index}>
          <button className={bold} onClick={() => this.jumpTo(index)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      current.squares.winSquare = winner[3];
      status = `Winner is ${winner[0]}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    // Add a toggle button that lets you sort the moves in either ascending or descending order.
    if (!this.state.ascendingOrder) {
      moves.sort((a, b) => b.key - a.key);
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <button onClick={() => this.toggleOrder()}>toggle order</button>
        </div>
      </div>
    );
  }
}

export default Game;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    // checking do we have a winner or return null
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], squares[b], squares[c], lines[i]];
    }
  }
  return null;
}
