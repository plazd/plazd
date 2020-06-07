import React, { Component } from "react";
import Lottie from "react-lottie";
import animationData from "../../lottie/namaste.json";

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
    return <Lottie options={defaultOptions} height={100} width={100} />;
  }
}

export default cryLottie;
