import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
  renderSquare(i, win) {
    return (
      <Square
        key={i}
        winner={win}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const squares = [];
    let row = [];
    let k = 0;
    let win = false;

    for (let i = 0; i < 3; i += 1) {
      row = [];
      for (let j = 0; j < 3; j += 1) {
        k = (i * 3) + j;
        if (this.props.squares.winSquare) {
          win = this.props.squares.winSquare.indexOf(k) !== -1;        
        }
        row.push(this.renderSquare(k, win));
      }

      squares.push(<div key={k} className="board-row"> {row} </div>);
    }

    return <div>{squares}</div>;
  }
}
