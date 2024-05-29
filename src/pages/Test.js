import { useState } from "react";

// 하나의 작은 사각형
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// 9개의 사각형 부분
function Board({ xIsNext, squares, onPlay }) {
  // 9개의 엘리먼트로 배열을 생성하고 각 엘리먼트를 null로 설정
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  // 사각형 클릭 시 작동
  function handleClick(i) {
    // 왜? 조기 반환?
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // props로 전달 받은 squares 배열 복사 하여 새 변수에 할당
    const nextSquares = squares.slice();
    // game에서 초기값 false로 설정한 값을 props로 넘겨받아서 그 값에 따라서 해당 버튼의 i값을 가지고 value 할당한다.
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner : " + winner;
  } else {
    status = "Next player : " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* 사용자가 클릭하기 전까지는 함수를 호출하면 안됨. 따라서 클릭되면 함수가 호출되도록 화살표 함수로 작성 */}
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

// game의 승자를 계산
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

// index.js 에서 Game 컴포넌트를 최상위 컴포넌트로 사용핟도록 지시함.
export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true);
  // 9개의 칸을 모두 null로 초기화하고 시작
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); // 사용자가 현재 어떤 단계를 보고 있는지 추적할 수 있는 상태 변수
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]; // 마지막 동작을 렌더링하는 대신 현재 선택한 동작을 렌더링

  // 칸을 클릭할 때마다 호출, 새로운 squares 배열 생성 이를 history 배열에 저장
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // 이전 히스토리의 해당 부분만 유지하도록
    setHistory([...history, nextSquares]); // history 에 있는 모든 항목을 포함하는 새 배열을 만들고 그 뒤에 nextSquares 를 만든다. (전개구문 알아보기)
    setCurrentMove(nextHistory.length - 1);
    // setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0); // 짝수일 경우 xIsNext 를 TRUE 처리
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
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
      <div className="geme-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
