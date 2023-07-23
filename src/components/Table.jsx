import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Table = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currency } = CryptoState();

  const fetchCoinList = async () => {
    setLoading(true);
    const response = await axios.get(CoinList(currency));
    setCoins(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoinList();
  }, []);

  console.log("Coins List: ", coins);
  return (
    <>
      {loading ? (
        <p>Loading Data.....</p>
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold p-5">
            Crypto Currency By Market Cap 💸💰
          </h1>
          <table className="w-full border-black bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-[#21BF73] text-white">Coin</th>
                <th className="px-6 py-3 bg-[#21BF73] text-white">Price</th>
                <th className="px-6 py-3 bg-[#21BF73] text-white">
                  24h Change
                </th>
                <th className="px-6 py-3 bg-[#21BF73] text-white">
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <tr key={coin.id}>
                  <td className="px-6 py-3 border">
                    <Link
                      to={`/coins/${coin.id}`}
                      className="flex items-center"
                    >
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-8 h-8 mr-2"
                      />
                      {coin.name}
                    </Link>
                  </td>
                  <td className="px-6 py-3 border">{coin.current_price}</td>
                  <td className="px-6 py-3 border">
                    {coin.price_change_percentage_24h}
                  </td>
                  <td className="px-6 py-3 border">{coin.market_cap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Table;
