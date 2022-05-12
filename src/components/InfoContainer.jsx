import React from "react";
import Mqtt from "./Mqtt";

const InfoContainer = ({ img, topico }) => {
  return (
    <div className="info-container">
      <img src={img} className="info-icon" alt="" />
      <Mqtt topicName={topico} />
    </div>
  );
};

export default InfoContainer;
