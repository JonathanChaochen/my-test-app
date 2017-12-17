import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    const squares = [];
    let row = [];
    let k = 0;

    for (let i = 0; i < 3; i += 1) {
      row = [];
      for (let j = 0; j < 3; j += 1) {
        k = (i * 3) + j;
        row.push(this.renderSquare(k));
      }

      squares.push(<div className="board-row">{row}</div>);
    }

    return <div>{squares}</div>;
  }
}
