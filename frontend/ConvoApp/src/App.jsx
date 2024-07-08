import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <div style={{
        backgroundImage: 'url(wood-591631.jpg)',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
    <Navbar />
      <Home />
      <Footer />
    </div>
      
    </>
  );
}

export default App;
