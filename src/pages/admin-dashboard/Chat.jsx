import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io("http://localhost:8888");

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userToChatWith, setUserToChatWith] = useState(""); 
  const [chatId, setChatId] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchMessages = async () => {
      if (chatId) {
        try {
          const response = await axios.get(`http://localhost:8888/messages/${chatId}`);
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();

    if (chatId) {
      socket.emit("joinChat", { chatId });

      socket.on("receiveMessage", (msg) => {
        setMessages(prevMessages => [...prevMessages, msg]);
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [chatId]);

  useEffect(() => {
    const savedChatId = localStorage.getItem("activeChatId");
    if (savedChatId) {
      setChatId(savedChatId);
    }
  }, []);

  useEffect(() => {
    if (chatId) {
      localStorage.setItem("activeChatId", chatId);
    }
  }, [chatId]);

  const startChat = async () => {
    if (!userToChatWith) {
      alert("Please enter the user ID you want to chat with.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8888/startChat", {
        user1_id: currentUserId,
        user2_id: userToChatWith,
      });

      setChatId(response.data.chatId);
    } catch (error) {
      console.error("Error starting chat:", error);
      alert("Failed to start chat. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "" && chatId) {
      const newMessage = {
        chatId,
        senderId: currentUserId, 
        content: message.trim(), // Adjusted from message to content
      };
      console.log(newMessage);
      

      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={userToChatWith}
          onChange={(e) => setUserToChatWith(e.target.value)}
          placeholder="Enter user ID to chat with..."
        />
        <button onClick={startChat} disabled={isLoading}>
          {isLoading ? "Starting Chat..." : "Start Chat"}
        </button>
      </div>

      <div>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender_id === currentUserId ? "You" : msg.sender_id}</strong>: {msg.content} {/* Adjusted from message to content */}
            </div>
          ))
        ) : (
          <div>No messages yet. Start the conversation!</div>
        )}
      </div>

      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!chatId}
        />
        <button onClick={sendMessage} disabled={!chatId || message.trim() === ""}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
