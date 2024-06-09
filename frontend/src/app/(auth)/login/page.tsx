import React from "react";
import bg from "../../../../public/login-bg.jpg";

const Login = () => {
  return (
    <div
      className="flex max-h-screen min-h-[100vh] w-screen justify-center items-center bg-cover absolute top-0 -z-50"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="bg-slate-200 bg-opacity-60 p-12 rounded-lg">
        <div className="text-2xl font-bold mb-8 text-center">
          <h2>Log In</h2>
        </div>
        <div className="flex flex-col gap-4">
          <input
            className="rounded-lg px-4 py-2 w-60"
            placeholder="Email"
            type="email"
          />
          <input
            className="rounded-lg px-4 py-2 w-60"
            placeholder="Password"
            type="password"
          />
          <button className="bg-sky-400 rounded-lg px-4 py-2">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
