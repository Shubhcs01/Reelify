import React, { useRef, useState } from "react";
import "../Components/Feed.css";
import ReactDOM from "react-dom";

function Video(props) {
  
  const [isVideoPlaying, setisVideoPlaying] = useState(false);
  const vidRef = useRef();

  const onVideoClick = (event) => {
    event.preventDefault();
    event.target.muted = !event.target.muted;
  };

  const handelScroll = (event) => {
    console.log("ended");
    let nextVid = ReactDOM.findDOMNode(event.target).parentNode.nextSibling;
    // console.log(ReactDOM.findDOMNode(event.target).parentNode.nextSibling);
    if (nextVid) {
      nextVid.scrollIntoView();
      event.target.muted = true;
    }
  };

  return (
    <>
      <video
        src={props.src}
        className="videos-styling"
        id={props.id}
        onClick={onVideoClick}
        onEnded={handelScroll}
        muted="muted"
      />
    </>
  );
}

export default Video;
