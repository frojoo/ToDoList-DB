import { useEffect, useState } from "react";
import Login from "./components/Login";
import TodoCard from "./components/TodoCard";
import CreateTodo from "./components/CreateTodo";
import axios from "axios";

function App() {
  const [user, setUser] = useState();
  const [todos, setTodos] = useState();
  const [skip, setSkip] = useState(0);

  const getTodos = async () => {
    try {
      if (!user) return;

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${user.id}?skip=${skip}`
      );

      setTodos(response.data.todos);
      setSkip(skip + 5);
    } catch (error) {
      console.error(error);
      alert("You failed to get your ToDoList");
    }
  };

  const onClickLogout = () => {
    setUser(undefined);
  };

  const onClickReload = async () => {
    try {
      if (!user) return;

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${user.id}?skip=${skip}`
      );

      setTodos([...response.data.todos, ...todos]);
      setSkip(skip + 5);
    } catch (error) {
      console.error(error);
      alert("You failed to reload your ToDoList");
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
      <h1 className="text-4xl font-bold">
        MY TO DO LIST 😎
        <button
          className="ml-4 px-2 py-1 bg-cyan-200 hover:bg-cyan-400 rounded-lg text-gray-50 text-base"
          onClick={onClickLogout}
        >
          로그아웃
        </button>
      </h1>
      <div>
        <div className="mt-8 text-sm font-semibold">Believe in your self</div>
        <div className="text-xs">자신을 믿어라</div>
      </div>
      <CreateTodo userId={user.id} setTodos={setTodos} todos={todos} />
      <div className="mt-16">
        <button
          className="ml-4 px-2 py-1 bg-cyan-500 hover:bg-cyan-700 rounded-lg text-gray-50 text-base"
          onClick={onClickReload}
        >
          ▶
        </button>
      </div>
      <div className="mt-16 flex flex-col w-1/2">
        {todos &&
          todos.map((v, i) => {
            return (
              <TodoCard
                key={i}
                todo={v.todo}
                isDone={v.isDone}
                id={v.id}
                userId={user.id}
                setTodos={setTodos}
                todos={todos}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
