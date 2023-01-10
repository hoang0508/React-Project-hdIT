import React from "react";
import videoHomepage from "../../assets/video-homepage.mp4";

const Home = () => {
  return (
    <>
      <div className="homepage-container">
        <video autoPlay muted loop>
          <source src={videoHomepage} type="video/mp4" />
        </video>
        <div className="homepage-content">
          <div className="title-1">There's better way to ask</div>
          <div className="title-2">
            Create a typeform in minutes with our easy, no-code builder. Then
            sync responses to tools like HubSpot, so you can find (and action)
            data easily.
          </div>
          <div className="title-3">
            <button>Get's started. It's free</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
