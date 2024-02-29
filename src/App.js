import React, { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

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
    setValue("");
  };

  return (
    <div>
      <div>
        <div>
          <h1>할 일 목록</h1>
        </div>
        <List todoData={todoData} setTodoData={setTodoData} />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
