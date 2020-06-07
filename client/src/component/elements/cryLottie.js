import React, { Component } from "react";
import Lottie from "react-lottie";
import animationData from "../../lottie/cry.json";

class cryLottie extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    var wi = !isMobile ? 400 : 200;
    var hi = !isMobile ? 150 : 80;
    return <Lottie options={defaultOptions} height={hi} width={wi} />;
  }
}

export default cryLottie;
