import ReactPlayer from "react-player";

const VideoPlayer = () => {
  return (
    <div>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=Y2n7xFQWOjo&ab_channel=UNEtxea-AsociacióndelPaísVascoparalaUNESCO"
        width="60vw"
        height="60vh"
        controls
        muted
      />
    </div>
  );
};

export default VideoPlayer;
