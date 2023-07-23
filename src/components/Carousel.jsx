import axios from "axios";
import { useState, useEffect } from "react";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../CryptoContext";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency } = CryptoState();

  const fetchTredingCoins = async () => {
    console.log("Currency: ", currency);
    const response = await axios.get(TrendingCoins(currency));
    setTrending(response.data);
  };

  useEffect(() => {
    fetchTredingCoins();
  }, [currency]);

  console.log(trending);
  return (
    <>
      <div className="p-5 bg-white">
        <h1 className="text-3xl font-bold text-center">
          Top Trending Coins 🔥
        </h1>
      </div>
      <div className="flex flex-wrap p-5 justify-center space-y-5 space-x-5 items-center">
        {trending.map((item) => (
          <div className="w-44 h-44 rounded-lg border-black border-2 inline-block p-5 shadow-lg text-center space-y-2 bg-[#F7F7F7]">
            <h1 className="text-black">{item.name}</h1>
            <div className="flex items-center justify-center">
              {" "}
              <img src={item.image} width={50} />
            </div>

            {item.price_change_percentage_24h < 0 ? (
              <p className="text-red-500">
                {item.price_change_percentage_24h + "%"}{" "}
              </p>
            ) : (
              <p className="text-green-500">
                {item.price_change_percentage_24h + "%"}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Carousel;
