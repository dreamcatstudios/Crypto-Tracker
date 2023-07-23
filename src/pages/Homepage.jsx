import React from "react";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import CoinPage from "./CoinPage";
import Table from "../components/Table";

const Homepage = () => {
  return (
    <>
      <Carousel />
      <Table />
      <CoinPage />
    </>
  );
};

export default Homepage;
