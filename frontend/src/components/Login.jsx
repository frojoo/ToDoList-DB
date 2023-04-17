import { useState } from "react";
import axios from "axios";
import Signup from "./Signup";

function Login({ setUser }) {
  const [account, setAccount] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //계정 로그인
  const onSubmitLogin = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/${account}`
      );

      setUser(response.data.account);
    } catch (error) {
      console.error(error);
      alert("You failed to Log In");
    }
  };

  //계정 생성창 토글
  const onClickToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        <form className="my-6" onSubmit={onSubmitLogin}>
          <input
            className="grow border-2 border-cyan-700 rounded-lg focus:outline-cyan-800 px-2 py-1 text-lg"
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <input
            className="ml-4 px-2 py-1 bg-cyan-700 hover:bg-cyan-800 rounded-lg text-gray-50 w-[84px] text-lg cursor-pointer"
            type="submit"
            value="Log In"
          />
        </form>
        <button
          className="ml-4 px-2 py-1 bg-cyan-700 hover:bg-cyan-800 rounded-lg text-gray-50 w-[84px] text-lg"
          onClick={onClickToggle}
        >
          Sign Up
        </button>
      </div>
      {isOpen && <Signup setUser={setUser} />}
    </div>
  );
}

export default Login;
