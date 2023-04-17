import { useEffect, useState } from "react";
import Login from "./components/Login";
import TodoCard from "./components/TodoCard";
import CreateTodo from "./components/CreateTodo";
import axios from "axios";

function App() {
  const [user, setUser] = useState();
  const [todos, setTodos] = useState();

  const getTodos = async () => {
    try {
      if (!user) return;

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${user.id}`
      );

      setTodos(response.data.todos);
    } catch (error) {
      console.error(error);
      alert("You failed to get your ToDoList");
    }
  };

  useEffect(() => {
    getTodos();
  }, [user]);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-16">
      <h1 className="text-4xl font-bold">MY TO DO LIST 😎</h1>
      <div>
        <div className="mt-8 text-sm font-semibold">Believe in your self</div>
        <div className="text-xs">자신을 믿어라</div>
      </div>
      <CreateTodo />
      <div className="mt-16 flex flex-col w-1/2">
        {todos &&
          todos.map((v, i) => {
            return <TodoCard key={i} todo={v.todo} isDone={v.isDone} />;
          })}
      </div>
    </div>
  );
}

export default App;
