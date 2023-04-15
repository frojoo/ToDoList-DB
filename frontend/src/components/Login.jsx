import { useState } from "react";
import axios from "axios";

function Login({ setAccount }) {
  const [createAccount, setCreateAccount] = useState("");
  const [logInAccount, setLogInAccount] = useState("");

  //계정 생성
  const onSubmitSignin = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user`,
        {
          account: createAccount,
        }
      );

      setAccount(response.data.account.account);
    } catch (error) {
      alert("This Id is already existed");
    }
  };

  //계정 로그인
  const onSubmitLogIn = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user`
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form onSubmit={onSubmitSignin}>
        <input
          className="grow border-2 border-cyan-800 rounded-lg focus:outline-cyan-600 px-2 py-1 text-lg"
          type="text"
          value={createAccount}
          onChange={(e) => setCreateAccount(e.target.value)}
        />
        <input
          className="ml-4 px-2 py-1 bg-cyan-800 rounded-lg text-gray-50 w-24 cursor-pointer"
          type="submit"
          value="Sign in"
        />
      </form>
    </div>
  );
}

export default Login;
