import "./App.css";
import Header from "./components/Header";
import Homepage from "./pages/homepage";
import CoinPage from "./pages/CoinPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  // return (
  //   <div className="bg-black h-screen">
  //     {/* Test the background color without other components */}
  //   </div>
  // );
  return (
    <>
      <BrowserRouter>
        <div className="bg-white h-screen">
          <Header />
          <Routes>
            {" "}
            {/* Use the Routes component to wrap all the Route components */}
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
