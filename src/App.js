import { useState } from "react";

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue("X");
    // 각 사각형에 저장된 value는 다른 사각형과 완전히 독립적. 컴포넌트에서 set함수를 호출하면 react는 그 안에 있는 자식 컴포넌트도 자동으로 업데이트.
    // console.log("clicked!");
  }

  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
