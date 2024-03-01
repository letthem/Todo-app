import "./App.css";
import React, { useState, useCallback } from "react";
import Lists from "./components/Lists";
import Form from "./components/Form";

// 로컬 스토리지에 있으면 가져 오고 없으면 빈 배열
const initialTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];

function App() {
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  // 삭제
  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id); // 해당 id 제외한 모든 data 보여주기
      console.log("newTodoData", newTodoData);
      setTodoData(newTodoData); // 화면에 렌더링도 해주기!
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    },
    [todoData] // 의존성 배열. todoData가 바뀔 때에만 함수 다시 생성
  );

  // 추가
  const handleSubmit = (e) => {
    e.preventDefault(); // form 안에 input 전송할 때 페이지 리로드 방지

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // 원래 있던 할 일에 새로운 할 일 더해주기, value: "" <- 입력 끝나면 없애줌
    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));
    setValue("");
  };

  // 전체 삭제
  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
          handleClick={handleClick}
        />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}

export default App;
