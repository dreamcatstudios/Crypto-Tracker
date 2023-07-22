import React from "react";
import { CryptoState } from "../CryptoContext";

const Header = () => {
  const { currency, setCurrency } = CryptoState();

  return (
    <nav className="bg-blue-500 p-4 shadow-lg">
      <div className="flex item-center justify-between">
        <a className="text-white text-xl font-semibold">Crypto Tracker</a>
        <select name="currency-choose" id="">
          <option value="dollar">USD</option>
          <option value="rupee" selected>
            INR
          </option>
        </select>
      </div>
    </nav>
  );
};

export default Header;
