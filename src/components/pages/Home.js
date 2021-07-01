import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Login from '../Login';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <Footer />
      <Login/>
    </>
  );
}

export default Home;