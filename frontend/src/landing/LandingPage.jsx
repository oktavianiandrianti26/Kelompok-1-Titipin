import React from "react";
import Navbar from "../landing/Navbar";
import Beranda from "../landing/Beranda";
import Tentang from "../landing/Tentang";
import CaraNitipin from "../landing/CaraNitipin";
import Faq from "../landing/Faq";
import Kontak from "../landing/Kontak";
import Footer from "../landing/Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <section id="beranda">
        <Beranda />
      </section>
      <section id="tentang">
        <Tentang />
      </section>
      <section id="cara-nitipin">
        <CaraNitipin />
      </section>
      <section id="faq">
        <Faq />
      </section>
      <section id="kontak">
        <Kontak />
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
