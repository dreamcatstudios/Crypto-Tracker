import React from "react";
import { CryptoState } from "../CryptoContext";

const Header = () => {
  const { currency, setCurrency } = CryptoState();

  function onChangeSelect(e) {
    setCurrency(e.target.value.toLowerCase());
  }

  return (
    <nav className="bg-[#21BF73] p-4 shadow-lg">
      <div className="flex item-center justify-between">
        <a className="text-white text-2xl font-semibold">Crypto Tracker</a>
        <select
          name="currency-choose"
          id="currency-select"
          value={currency}
          onChange={onChangeSelect}
          className="rounded-sm px-2"
        >
          <option value="inr">INR</option>
          <option value="usd">USD</option>
        </select>
      </div>
    </nav>
  );
};

export default Header;
