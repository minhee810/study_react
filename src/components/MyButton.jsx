import { useState } from 'react';

function MyButton(){

    // component 안에서 어떠한 값을 기억하고 싶을 때 component 안에서 변수를 선언 -> useState 활용 
    // useState 에서 두가지를 얻을 수 있음. 현재 상태(count), 이를 업데이트할 수 있는 함수(setCount) 이름은 관례
    const [count, setCount] = useState(0);


function handleClick(){
    setCount(count + 1);
}

return (
    <button onClick={handleClick}>
        Clicked {count} times 
    </button>
);

}