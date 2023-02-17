import io from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";

const socket = io("https://microhubbackend.microhubltd.com.au/");

const Home = () => {
  const [user, setUser] = useState({});
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.emit("joinRoom", "asasdasdaffasf");

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("user connected");
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      room: "asasdasdaffasf",
      message,
      consumerId: 1,
      nutritionistId: 1,
      send_side: "nutritionist",
    });
    socket.on("messages", (messages) => {
      console.log(messages);
    });
  };
  return (
    <div className="App">
      <h1>Username: {user?.first_name}</h1>
      <div>
        <p>Connected: {"" + isConnected}</p>
        <p>Last pong: {lastPong || "-"}</p>
        <input
          type="text"
          placeholder="send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>send messages</button>
      </div>
    </div>
  );
};

export default Home;
