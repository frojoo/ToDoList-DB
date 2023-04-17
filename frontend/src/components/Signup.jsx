import React from "react";
import { useState } from "react";
import axios from "axios";

function Signup({ setUser }) {
  const [newAccount, setNewAccount] = useState("");

  //계정 생성
  const onSubmitSignup = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user`,
        {
          account: newAccount,
        }
      );

      setUser(response.data.account);
    } catch (error) {
      alert("You failed to Sing Up");
    }
  };
  return (
    <form onSubmit={onSubmitSignup}>
      <input
        className="grow border-2 border-cyan-600 rounded-lg focus:outline-cyan-700 px-2 py-1 text-lg"
        type="text"
        value={newAccount}
        onChange={(e) => setNewAccount(e.target.value)}
      />
      <input
        className="ml-4 px-2 py-1 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-gray-50 w-[84px] text-lg cursor-pointer"
        type="submit"
        value="Create"
      />
    </form>
  );
}

export default Signup;
