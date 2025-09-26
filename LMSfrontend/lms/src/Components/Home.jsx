import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./header and footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import './home.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

function Home() {
  const navigate = useNavigate();

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Navbar page="/home" />

      {/* Hero Section */}
      <section className="hero-section " data-aos="fade-up">
        <div className="hero-overlay ">
          <h1>Master New Skills Anytime, Anywhere</h1>
          <p>Join thousands of learners and start your journey today</p>
          <button onClick={() => navigate("/courses")}>Browse Courses</button>
        </div>
      </section>

      

      {/* Features */}
      <section className="features">
        <div className="feature" data-aos="fade-right">
          <h3>Learn from Experts</h3>
          <p>Top instructors with real-world experience.</p>
        </div>
        <div className="feature" data-aos="fade-up">
          <h3>Interactive Learning</h3>
          <p>Videos, quizzes, and hands-on projects.</p>
        </div>
        <div className="feature" data-aos="fade-left">
          <h3>Global Certifications</h3>
          <p>Recognized certifications to boost your career.</p>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="testimonials" data-aos="zoom-in">
        <h2>What Students Say</h2>
        <Slider {...sliderSettings} className="testimonial-slider">
          <div className="testimonial">
            <p>"The best LMS I've used. Everything is so intuitive!"</p>
            <span>- Ayesha, UI Designer</span>
          </div>
          <div className="testimonial">
            <p>"I landed a job thanks to the Fullstack Course!"</p>
            <span>- Ramesh, Developer</span>
          </div>
          <div className="testimonial">
            <p>"Easy to learn and track my progress."</p>
            <span>- Kavya, Student</span>
          </div>
        </Slider>
      </section>

      <Footer />
    </>
  );
}

export default Home;
