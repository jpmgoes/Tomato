import { useEffect, useState } from "react";
import React from "react";
import mqtt from "mqtt";

function Mqtt(props) {
  const { topicName } = props;

  const topicToSub = topicName;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = mqtt.connect("mqtt://broker.hivemq.com:8000/mqtt");
    client.on("connect", () => {
      client.subscribe(topicToSub);
    });

    client.on("message", (topic, payload, packet) => {
      const result = messages.concat(payload.toString());
      setMessages(result);
    });

    // eslint-disable-next-line
  }, []);
  return (
    <>
      {messages.map((message, index) => (
        <h2 key={index}>
          {!!Number(message) || Number(message) <= 0 ? message : 0}
        </h2>
      ))}
    </>
  );
}

export default Mqtt;
