import React from "react";
import "./Camara.css";
import { useNavigate } from "react-router-dom";

const Camara = ({
  setEmotion,
}: {
  setEmotion: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [image, setImage] = React.useState("");
  const navigate = useNavigate();
  (function () {
    var width = 320; // We will scale the photo width to this
    var height = 0; // This will be computed based on the input stream

    var streaming = false;

    var video: any = null;
    var canvas: any = null!;
    var photo: any = null!;
    var startbutton = null;

    function startup() {
      video = document.getElementById("video");
      canvas = document.getElementById("canvas");
      photo = document.getElementById("photo");
      startbutton = document.getElementById("startbutton");

      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function (err) {
          console.log("An error occurred: " + err);
        });

      video.addEventListener(
        "canplay",
        function (ev: any) {
          if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);

            if (isNaN(height)) {
              height = width / (4 / 3);
            }

            video.setAttribute("width", width);
            video.setAttribute("height", height);
            canvas.setAttribute("width", width);
            canvas.setAttribute("height", height);
            streaming = true;
          }
        },
        false
      );

      startbutton?.addEventListener(
        "click",
        function (ev) {
          takepicture();
          ev.preventDefault();
        },
        false
      );

      clearphoto();
    }

    function clearphoto() {
      var context = canvas.getContext("2d");
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);

      var data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
      setImage(data);
    }

    function takepicture() {
      var context = canvas.getContext("2d");
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        var data = canvas.toDataURL("image/png");
        photo.setAttribute("src", data);
        setImage(data);
      } else {
        clearphoto();
      }
    }

    window.addEventListener("load", startup, false);
  })();

  const sendImage = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    };
    fetch("http://127.0.0.1:8000/get-emotions", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEmotion(data.response[0].emotion);
      });

    navigate("/spotify");
  };

  return (
    <div className="contentarea" style={{ height: "100vh" }}>
      <h1>Click on "Take Photo" to capture your picture.</h1>
      <div className="camera">
        <video id="video">Video stream not available.</video>
      </div>
      <div>
        <button
          id="startbutton"
          style={{ borderRadius: "5px", padding: "5px" }}
        >
          Take photo
        </button>
      </div>
      <canvas id="canvas"></canvas>
      <div className="output">
        <img id="photo" alt="The screen capture will appear in this box." />
        <button
          onClick={sendImage}
          style={{
            borderRadius: "5px",
            padding: "5px",
            marginTop: "10px",
            backgroundColor: "#2563eb",
            fontSize: "16px",
            color: "white",
            border: "none",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Camara;
