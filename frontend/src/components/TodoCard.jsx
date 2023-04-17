import axios from "axios";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

function TodoCard({ todo, isDone, id, userId, todos, setTodos }) {
  const [done, setDone] = useState(isDone);

  const checkDone = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${id}/done`,
        {
          userId,
        }
      );

      setDone(response.data.todo.isDone);
    } catch (error) {
      console.error(error);
      alert("You failed to update");
    }
  };

  const onClickDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${id}`,
        {
          data: {
            userId,
          },
        }
      );

      const array = todos.filter((v, i) => {
        return v.id !== response.data.todo.id;
      });

      setTodos(array);
    } catch (error) {
      console.error(error);
      alert("You failed to delete");
    }
  };

  return (
    <div className="flex my-4">
      {done ? (
        <>
          <div className="relative" onClick={checkDone}>
            <div className="border-4 border-cyan-700 w-8 h-8 rounded-xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-700 w-8 h-8 rounded-xl"></div>
          </div>
          <div className="text-2xl ml-4 line-through">{todo}</div>
        </>
      ) : (
        <>
          <div
            className="border-4 border-cyan-700 w-8 h-8 rounded-xl"
            onClick={checkDone}
          ></div>
          <div className="text-2xl ml-4">{todo}</div>
        </>
      )}
      <button
        className="ml-10 text-gray-400 text-xl hover:text-cyan-900 hover:scale-110 ease-linear duration-300"
        onClick={onClickDelete}
      >
        <FiTrash2 />
      </button>
    </div>
  );
}

export default TodoCard;
