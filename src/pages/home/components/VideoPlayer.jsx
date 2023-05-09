import ReactPlayer from "react-player";
import video from "../../../assets/videoIndex.mp4"

const VideoPlayer = () => {
  return (
    <div>
      <ReactPlayer
        url={video}
        width="56vw"
        height="60vh"
        controls
        muted
      />
    </div>
  );
};

export default VideoPlayer;
