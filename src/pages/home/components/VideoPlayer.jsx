import ReactPlayer from "react-player";
import video from "../../../assets/videoIndex.mp4"

const VideoPlayer = () => {
  return (
    <div>
      <ReactPlayer
        url={"https://youtu.be/uRQkmDjP_jM"}
        width="56vw"
        height="60vh"
        controls
        muted
      />
    </div>
  );
};

export default VideoPlayer;
