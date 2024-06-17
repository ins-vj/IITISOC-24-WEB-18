import React from "react";


const SignUp = () => {
  return (
    <div
      className="flex max-h-screen min-h-[100vh] w-screen justify-center items-center bg-cover absolute top-0 -z-50"
      style={{ backgroundImage: `url()` }}
    >
      <div className="bg-slate-200 bg-opacity-60 p-12 rounded-lg">
        <div className="text-2xl font-bold mb-8 text-center">
          <h2>Sign Up</h2>
        </div>
        <div className="flex flex-col gap-4">
          <input
            className="rounded-lg px-4 py-2 w-60"
            placeholder="Full Name"
            type="text"
          />
          <input
            className="rounded-lg px-4 py-2 w-60"
            placeholder="Email"
            type="email"
          />
          <input
            className="rounded-lg px-4 py-2 w-60"
            placeholder="Enter a Password"
            type="password"
          />
          <input
            className="rounded-lg px-4 py-2 w-60"
            placeholder="Enter Password Again"
            type="password"
          />
          <button className="bg-sky-400 rounded-lg px-4 py-2">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
