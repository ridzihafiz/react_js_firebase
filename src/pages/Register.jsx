import React from "react";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Register() {
  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleGoogleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;

    if (!email || !password || !password2) {
      return alert("please input the data");
    }

    if (password !== password2) {
      return alert("password is not matched");
    }

    if (password.length < 6) {
      return alert("password must be more than 6 character");
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className=" w-screen min-h-screen flex flex-col bg-gradient-to-tr from-orange-800 to-orange-500 max-w-[500px] mx-auto p-10 ">
      <form
        className=" w-full bg-white flex flex-col gap-4 shadow-lg rounded-lg mt-8 p-6 "
        autoComplete="off"
        onSubmit={handleGoogleRegister}
      >
        <h1 className=" text-4xl text-orange-500 text-center ">Register</h1>
        <div className=" flex flex-col gap-2 ">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className=" h-10 px-3 rounded-md border-[1px] border-gray-300 "
          />
        </div>

        <div className=" flex flex-col gap-2 ">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className=" h-10 px-3 rounded-md border-[1px] border-gray-300 "
          />
        </div>

        <div className=" flex flex-col gap-2 ">
          <label htmlFor="password2">Repeat Password</label>
          <input
            type="password"
            id="password2"
            className=" h-10 px-3 rounded-md border-[1px] border-gray-300 "
          />
        </div>

        <div className=" mt-4 flex flex-col gap-2 "></div>
        <button
          className=" h-10 w-full bg-orange-500 text-white rounded-lg "
          type="submit"
        >
          Register
        </button>
        <button
          className=" h-10 w-full bg-yellow-500 text-white rounded-lg "
          type="button"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
        <Link
          to={"/"}
          className=" h-10 w-full bg-slate-500 text-white rounded-lg flex justify-center items-center "
        >
          Login
        </Link>
      </form>
    </main>
  );
}
