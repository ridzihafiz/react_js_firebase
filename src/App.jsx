import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {
  // check apakah sudah teconnect dengan firebase
  // useEffect(() => {
  //   console.log(auth);
  // }, []);

  // state
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  // component lifecycle
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (result) => {
      // console.log("result : ", result);
      if (result) {
        setIsLogin(true);
        setLoading(false);
        return;
      }

      setIsLogin(false);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className=" w-screen h-screen flex flex-col justify-center items-center ">
        Loading..
      </div>
    );
  }

  return (
    <>
      {isLogin ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Register />} />
        </Routes>
      )}
    </>
  );
}
