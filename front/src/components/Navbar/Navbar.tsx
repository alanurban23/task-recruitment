import React from "react";

type Props = {};

function Navbar({}: Props) {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-primary text-white p-6">
      <ul className="flex mx-auto gap-6 text-lg">
        <li className="hover:cursor-pointer">Home</li>
        <li className="hover:cursor-pointer">Transactions</li>
        <li className="hover:cursor-pointer">Dashboard</li>
      </ul>
    </nav>
  );
}

export default Navbar;
