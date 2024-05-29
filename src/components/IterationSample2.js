import { useState } from "react";

const IterationSample2 = () => {
  const [names, setNames] = useState([
    { id: 1, text: "snowman" },
    { id: 2, text: "ice" },
    { id: 3, text: "snow" },
    { id: 4, text: "wind" },
  ]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id
  const onChange = (e) => setInputText(e.target.value);
  const onClick = () => {
    // 새로운 항목을 추가한 배열 만들기
    const nextNames = names.concat({
      id: nextId,
      text: inputText,
    });
    setNextId(nextId + 1);
    setNames(nextNames);
    setInputText("");
  };
  const nameList = names.map((name) => <li key={name.id}>{name.text}</li>);

  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{nameList}</ul>
    </>
  );
};

export default IterationSample2;
