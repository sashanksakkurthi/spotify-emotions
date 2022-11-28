import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="nav-container">
        <div className="wrapper">
          <nav>
            <div className="logo">D.</div>
            <ul className="nav-items">
              <li>
                <a className="nav-btn-container" href="camera.html">
                  <img className="search-btn" src="/assets/cam.png" alt="" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="header-container">
        <div className="wrapper">
          <header>
            <div className="hero-content">
              <h1>Get music based on Mood.</h1>
              <p>Just upload a selfie and enjoy!</p>
              <a href="/camera"> Take photo </a>
            </div>

            <div className="hero-image">
              <img src="/assets/photo.png" alt="" />
              <div className="photo-bg"></div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default Home;
