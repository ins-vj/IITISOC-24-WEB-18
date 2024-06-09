import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <div className="flex flex-row py-6 p-8 bg-sky-400 bg-opacity-50 justify-between">
        <Link href="/">
          <div>LOGO</div>
        </Link>

        <div className="flex flex-row gap-4">
          <Link href="/login">
            <div>Login</div>
          </Link>
          <Link href="/signup">
            <div>Sign Up</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
