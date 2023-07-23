// CoinPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinChart from "../components/CoinChart";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [error, setError] = useState(null);
  const { currency, symbol } = CryptoState();
  const [shortDescription, setShortDescription] = useState("");

  useEffect(() => {
    fetchCoin(id);
  }, [id]);

  const fetchCoin = async () => {
    try {
      const response = await axios.get(SingleCoin(id));
      console.log("Coin Data:", response.data);
      setCoin(response.data);

      // Extract the short description from the full description
      if (response.data.description) {
        const sentence = response.data.description.en.split(".");
        if (sentence.length >= 2) {
          const slicedParagraph = sentence.slice(0, 1).join(".") + ".";
          setShortDescription(slicedParagraph.trim());
        } else {
          setShortDescription(response.data.description);
        }
      } else {
        setShortDescription("No description available."); // Set a default description if the API response doesn't have a description
      }
    } catch (error) {
      setError("Error fetching data. Please try again later.");
    }
  };

  return (
    <>
      <div className="space-y-5">
        {coin ? (
          <>
            <div className="flex flex-col items-center space-y-5 pt-10">
              <img src={coin.image.large} alt={coin.name} width={200} />
              <h1 className="text-3xl font-bold">{coin.name}</h1>
            </div>
            <div className="text-center">
              <p className=" font-semibold">{shortDescription}</p>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold">
                Rank: {coin.market_cap_rank}
              </h1>
              <h1 className="text-2xl font-bold">
                Current Price: {symbol} {coin.market_data.current_price.inr}
              </h1>
              <h1 className="text-2xl font-bold">
                Market Cap: {symbol} {coin.market_data.market_cap.inr}
              </h1>
            </div>
            <CoinChart coin={coin} id={id} />
          </>
        ) : (
          <div>Loading coin data...</div>
        )}
      </div>
    </>
  );
};

export default CoinPage;
