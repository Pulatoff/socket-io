import io from "socket.io-client";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../utils/config";

const socket = io(URL);

const Home = () => {
  const room = "niyozbek";
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      const resp = await axios.get(`${URL}api/v1/messages/${room}`);
      if (resp.data?.isOk) {
        setMessages(resp.data?.data);
      }
    };
    getMessages();
    socket.on("connection", () => {
      setIsConnected(true);
      console.log("user connected");
      socket.emit("join", "asasdasdaffasf");
    });
    socket.on("messages", (messages) => {
      console.log(messages);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("messages");
    };
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", {
      room: "asasdasdaffasf",
      message,
      consumerId: 1,
      nutritionistId: 3,
      send_side: "nutritionist",
    });
  };

  return (
    <div className="App">
      <h1>Username: Niyozbek</h1>
      <div>
        <p>Connected: {"" + isConnected}</p>
        <div className="messages">
          <div className="message">Nma gap uzi</div>
        </div>
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
