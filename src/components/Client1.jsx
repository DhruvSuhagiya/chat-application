import { useEffect, useState } from "react";
import mqtt from "mqtt";
import "./Client1.css";

function Client1() {
  const topic = "client1";
  const [msg, setMsg] = useState("");
  const [client, setClient] = useState(null);
  const [user, setUser] = useState("");
  const [recivingMsg, setRecivingMsg] = useState("");

  const host = "ws://broker.emqx.io:8083/mqtt";

  useEffect(() => {
    if (client) {
      client.on("error", (err) => {
        console.log("Connection error : ", err);
        client.end();
      });
      console.log("connecting MQTT client... ");
      client.on("connect", () => {
        console.log(`${topic} connected to : ${user}`);

      });
      client.on("reconnect", () => {
        console.log("Reconnecting...");
      });
    }
  }, [client,user]);

  const msgHandler = (e) => {
    setMsg(e.target.value);
  };

  const connect = () => {
      if(user)
    setClient(mqtt.connect(host));
    else{
        alert("Enter user")
    }
  }
  const messageHandle = () => {
    if (client) {
      client.subscribe(topic);
      client.publish(user, msg);
      console.log("message send");
      client.on("message", (topic, message) => {
          console.log(
              "Received Message: " + message.toString() + "\nOn topic: " + topic
              );
              setRecivingMsg(message.toString());
      });
    }
  };
  if (client) {
    client.on("close", () => {
      console.log(" disconnected");
      setClient(null);
    });
  }

  const formHandler = (e) => {
    e.preventDefault();
  };

  const userHandler = (e) => {
    setUser(e.target.value);
  };
  return (
    <>
      <form className="ClientOne" onSubmit={formHandler}>
        <h4>{topic}</h4>
        <div className="sender">
          <label>To :</label>
          <input
            type="text"
            onChange={userHandler}
            value={user}
            placeholder="Name"
          />
          <button onClick={connect}>Connect</button>
        </div>
        <div className="disc">
          <textarea
            placeholder="Message"
            onChange={msgHandler}
            value={msg}></textarea>

          <button onClick={messageHandle}>send</button>
        </div>
        <br />
        <div className="reciving">
          <label>Reciving:</label>
          <p>{recivingMsg}</p>
        </div>
      </form>
    </>
  );
}

export default Client1;
