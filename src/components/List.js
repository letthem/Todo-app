import React from "react";

export default function List({ todoData, setTodoData }) {
  // 삭제
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id); // 해당 id 제외한 모든 data 보여주기
    console.log("newTodoData", newTodoData);
    setTodoData(newTodoData); // 화면에 렌더링도 해주기!
  };

  // 완료
  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });

    setTodoData(newTodoData);
  };

  return (
    <div>
      {todoData.map((data) => (
        <div key={data.id}>
          <input
            type="checkbox"
            defaultChecked={false}
            onChange={() => handleCompleteChange(data.id)}
          />
          {data.title}
          <button onClick={() => handleClick(data.id)}>x</button>
        </div>
      ))}
    </div>
  );
}
