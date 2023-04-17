import axios from "axios";
import React, { useState } from "react";

function CreateTodo({ userId, setTodos, todos }) {
  const [todo, setTodo] = useState("");

  const onSubmitTodo = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/todo`,
        {
          todo,
          userId,
        }
      );

      setTodos([response.data.todo, ...todos]);
      setTodo("");
    } catch (error) {
      console.error(error);
      alert("You failed to post new Todo");
    }
  };

  return (
    <form className="flex mt-2" onSubmit={onSubmitTodo}>
      <input
        className="grow border-2 border-slate-400 rounded-lg focus:outline-slate-700 px-2 py-1 text-lg"
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <input
        className="ml-4 px-2 py-1 bg-slate-400 hover:bg-slate-700 rounded-lg text-slate-50 cursor-pointer"
        type="submit"
        value="New Todo"
      />
    </form>
  );
}

export default CreateTodo;
