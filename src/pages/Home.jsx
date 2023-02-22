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
      const resp = await axios.get(`${URL}api/v1/messages/${room}`, {
        withCredentials: true,
      });

      if (resp.data?.isOk) {
        setMessages(resp.data?.data.messages);
      }
    };
    getMessages();
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("user connected");
      socket.emit("join", room);

      socket.on("newMessages", (messages) => {
        console.log(messages);
        setMessages(messages);
      });
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
  const sendMessage = async (e) => {
    e.preventDefault();
    const body = {
      room: room,
      message,
      consumerId: 1,
      nutritionistId: 3,
      send_side: "consumer",
    };
    const resp = await axios.post(`${URL}api/v1/messages/${room}`, body, {
      withCredentials: true,
    });
    if (resp.data.isOk) {
      messages.push(body);
    }
    const respn = await axios.get(`${URL}api/v1/messages/${room}`, {
      withCredentials: true,
    });

    if (respn.data?.isOk) {
      setMessages(respn.data?.data.messages);
      setMessage("");
      socket.emit("messages", room);
    }
  };

  return (
    <div className="App">
      <h1>Username: Niyozbek</h1>
      <div>
        <p>Connected: {"" + isConnected}</p>
        <div className="messages">
          {messages.map((val) => {
            return (
              <div className="message" key={val.id}>
                {val.message}
              </div>
            );
          })}
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
