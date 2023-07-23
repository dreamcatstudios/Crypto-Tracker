import React from "react";
import { CryptoState } from "../CryptoContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { currency, setCurrency } = CryptoState();

  function onChangeSelect(e) {
    setCurrency(e.target.value);
  }

  return (
    <nav className="bg-[#0D1282] p-4 shadow-lg">
      <div className="flex item-center justify-between">
        <a className="text-white text-xl font-semibold">Crypto Tracker</a>
        <select
          name="currency-choose"
          id="currency-select"
          value={currency}
          onChange={onChangeSelect}
        >
          <option value="dollar">USD</option>
          <option value="rupee">INR</option>
        </select>
      </div>
    </nav>
  );
};

export default Header;
