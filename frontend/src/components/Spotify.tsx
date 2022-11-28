import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Spotify = ({ emotion }: { emotion: string }) => {
  const [songId, setSongId] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getSong = async () => {
      if (emotion == "happy") {
        setSongId("4uUG5RXrOk84mYEfFvj3cK");
      } else if (emotion == "sad") {
        setSongId("5aXfGM7WVcqyAvqnL7k0y3");
      } else if (emotion == "angry") {
        setSongId("1nZkrUFLq265za9lofFO3p");
      } else if (emotion == "neutral") {
        console.log("neutral");
        setSongId("1OHu4U4aop2X8QnBbB6NFL");
      } else if (emotion == "surprise") {
        setSongId("1OHu4U4aop2X8QnBbB6NFL");
      } else if (emotion == "disgust") {
        setSongId("2DnJjbjNTV9Nd5NOa1KGba");
      } else if (emotion == "fear") {
        setSongId("4RvWPyQ5RL0ao9LPZeSouE");
      } else {
        setSongId("4RvWPyQ5RL0ao9LPZeSouE");
      }
    };
    getSong();
    setLoading(false);
  }, [emotion]);

  return (
    <div>
      {emotion ? (
      <iframe
        style={{ borderRadius: "10px", padding: "10px" }}
        src={`https://open.spotify.com/embed/track/${songId}?utm_source=generator`}
        width="100%"
        height="250"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      ) : (
        <div>loading ...</div>
      )}
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <button
          style={{
            borderRadius: "5px",
            padding: "5px",
            marginTop: "10px",
            backgroundColor: "#2563eb",
            fontSize: "16px",
            color: "white",
            border: "none",
          }}
          onClick={() => {
            navigate("/camera");
          }}
        >
          Back to Camera
        </button>
      </div>
    </div>
  );
};

export default Spotify;
