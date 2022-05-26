import React from "react";
import Mqtt from "./Mqtt";

const InfoContainer = (props) => {
  const { img, topico, alt } = props;

  return (
    <div className="info-container">
      <img src={img} className="info-icon" alt={alt} />
      <Mqtt topicName={topico} />
    </div>
  );
};

export default InfoContainer;
