import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const Table = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalCoins, setOriginalCoins] = useState([]);

  const { currency, symbol } = CryptoState();

  const fetchCoinList = async () => {
    setLoading(true);
    const response = await axios.get(CoinList(currency));
    setCoins(response.data);
    setOriginalCoins(response.data);
    setLoading(false);
  };

  console.log("Coins List: ", coins);

  const onChangeInput = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm === "") {
      setCoins(originalCoins);
    } else {
      const filteredCoins = coins.filter((coin) => {
        return coin.name.toLowerCase().includes(searchTerm);
      });
      setCoins(filteredCoins);
    }
  };

  useEffect(() => {
    fetchCoinList();
  }, [currency]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Oval color="#21BF73" height={100} width={100} ariaLabel="loading" />
        </div>
      ) : (
        <>
          <div className="mt-10">
            <h1 className="text-center text-3xl font-bold p-5">
              Crypto Currency By Market Cap 💸💰
            </h1>
          </div>

          <div className="flex mx-auto items-center justify-center pt-5 pb-10">
            <input
              type="text"
              className="w-[80%] py-3 text-center border border-black rounded-lg"
              placeholder="Search cryptocurrencies..."
              onChange={onChangeInput}
            />
          </div>

          <table className="w-full border-black bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-[#21BF73] text-white">Coin</th>
                <th className="px-6 py-3 bg-[#21BF73] text-white">{`${symbol}Price`}</th>
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
