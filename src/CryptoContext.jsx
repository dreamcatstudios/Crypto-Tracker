import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("USD");

  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);

  return (
    <CryptoProvider value={(currency, symbol, setCurrency)}>
      {children}
    </CryptoProvider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(crypto);
};
