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
      <div className="p-5">
        <h1 className="text-3xl font-bold text-center">
          Top Trending Coins 🔥
        </h1>
      </div>
      <div className="flex flex-wrap p-5 justify-center space-y-5 space-x-5 items-center">
        {trending.map((item) => (
          <div className="w-36 h-36 rounded-lg border-black border-2 inline-block p-5 shadow-lg text-center">
            <h1 className="text-black">{item.id}</h1>
            <div>
              {" "}
              <img src={item.image} width={50} />
            </div>

            <p className="text-white"> Price</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Carousel;
