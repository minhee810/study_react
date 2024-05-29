import { useState } from "react";

function Square({ value, onSquareClick }) {
  // const [value, setValue] = useState(null); -> 부모 컴포넌트에서 관리하기로 : 이유 -> 각 상태가 공유되어야 하기 때문

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // 순서 정하기 위한 변수
  // const [xIsNext, setXIsNext] = useState(true);  game 컴포넌트에서 props로 넘겨주기로

  // const [squares, setSquares] = useState(Array(9).fill(null)); // 길이가 9인 배열을 null로 초기화 -> Square 컴포넌트로 값을 전달

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      // 만약 값이 있을 경우 리턴하여 해당 값을 변경 못하도록 설정 + 승자가 있을 경우에도 값 변경 x
      return;
    }
    const nextSquares = squares.slice(); // null로 초기화됐던 배열들을 복사하여 nextSquares 배열을 생성

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    //setSquares(nextSquares); // 복사한 배열이 값을 변경
    //setXIsNext(!xIsNext); // 순서 변경해주기
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "이긴 사람 : " + winner;
  } else {
    status = "다음 차례 : " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// 최상위 컴포넌트
export default function Game() {
  //  const [xIsNext, setXIsNext] = useState(true);
  // 전체 게임 기록을 포함하는 history state
  // game 컴포넌트에 배치하면 자식인 board 컴포넌트에서 squares state를 제거할 수 있다.
  const [history, setHistory] = useState([Array(9).fill(null)]); // 배열의 배열

  // 사용자가 현재 어떤 단계를 보고 있는지를 추적
  const [currentMove, setCurrentMove] = useState(0);
  // 현재 이동에 대한 사각형을 렌더링하기 위해서 history의 마지막 사각형의 배열을 읽어야 한다.
  // 현재 이동에서의 게임 보드의 상태를 나타내는 배열
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  // 업데이트된 squares 배열을 새 히스토리 항목에 추가해야한다.
  // 리렌더링을 트리거 하기 위해 Game의 state를 업데이트 해야하지만, 더이상 호출할 수 있는 setSquares함수가 없음.
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // history에 있는 모든 항목을 포함하는 새 배열을 만들고 그 뒤에 nextSquares 를 만든다.
    setHistory([...history, nextSquares]);
    setCurrentMove(nextHistory.length - 1);
    // setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move # " + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
