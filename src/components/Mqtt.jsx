import { useEffect } from "react";
import React from "react";
import mqtt from "mqtt";

function Mqtt({ topicName }) {
  const topicToSub = topicName;
  // const [_, setConnectionStatus] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  useEffect(() => {
    const client = mqtt.connect("mqtt://broker.hivemq.com:8000/mqtt");
    client.on("connect", () => {
      client.subscribe(topicToSub);
      // setConnectionStatus(true);
    });

    client.on("message", (topic, payload, packet) => {
      setMessages(messages.concat(payload.toString()));
    });
    // eslint-disable-next-line
  }, []);
  console.log();
  return (
    <>
      {messages.map((message) => (
        <h2>{!!Number(message) || Number(message) <= 0 ? message : 0}</h2>
      ))}
    </>
  );
}

export default Mqtt;
