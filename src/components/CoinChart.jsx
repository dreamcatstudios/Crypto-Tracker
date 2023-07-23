import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
} from "recharts";

const CoinChart = ({ coin, id }) => {
  const { currency } = CryptoState();

  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistoricalData = async () => {
    if (id) {
      try {
        const response = await axios.get(HistoricalChart(id, currency, 30)); // Fetch data for the last 30 days
        setHistoricalData(response.data.prices);
        setLoading(false);
      } catch (error) {
        setError("Error fetching historical data. Please try again later.");
        setLoading(false);
      }
    }
  };

  const formatChartData = (data) => {
    return data.map((dataPoint) => ({
      date: new Date(dataPoint[0]).toLocaleDateString(),
      price: dataPoint[1],
    }));
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [id, currency]);

  if (loading) {
    return <div>Loading chart data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formattedData = formatChartData(historicalData);

  // Calculate the date range for the last 7 days
  const currentDate = new Date();
  const lastSevenDays = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  return (
    <div>
      <h2>{coin.name} Price Chart</h2>
      <LineChart
        width={1000}
        height={600}
        data={formattedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="date" domain={[lastSevenDays, currentDate]} />{" "}
        {/* Set the initial domain */}
        <YAxis dataKey="price" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          labelFormatter={(label) => new Date(label).toLocaleDateString()}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="price"
          name="Price"
          stroke="#4caf50"
          dot={false}
        />
        <Brush dataKey="date" height={30} stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default CoinChart;
