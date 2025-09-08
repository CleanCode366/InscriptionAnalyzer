import type React from "react";
import HeroSection from "./HeroSection";
import Statistics from "./Statistics";
import FeaturedInscriptionsCarousel from "./FeaturedInscriptionsCarousel";
import HowItWork from "./HowItWork";
import ReactActivity from "./RecentActivity";
import WhyJoinSection from "./WhyJoinSection";
import CallToAction from "./CallToAction";
import Footer from "./Footer";


const HomePage: React.FC = () => {


  return (
    <>
      {/* Navigation */}
      {/* <Nav/> */}

      {/* Hero Section */}
      <HeroSection/>

      {/* Statistics */}
      <Statistics/>

      {/* Featured Inscriptions Carousel */}
      <FeaturedInscriptionsCarousel/>

      {/* How It Works */}
      <HowItWork/>

      {/* Recent Activity */}
      <ReactActivity/>

      {/* Why Join Section */}
      <WhyJoinSection/>

      {/* Call to Action */}
      <CallToAction/>

      {/* Footer */}
      <Footer/>
    </>
    // <div className="min-h-screen text-white">
    // </div>
  );
};

export default HomePage;