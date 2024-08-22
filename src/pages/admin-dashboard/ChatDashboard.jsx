import React, { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./Chat";

function ChatDashboard({ userId }) {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    axios.get("https://myproject-backend-2jt1.onrender.com/userChats", { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
      .then(res => setChats(res.data));
  }, []);

  return (
    <div>
      <div>
        <h2>Your Chats</h2>
        {chats.map(chat => (
          <div key={chat.id} onClick={() => setSelectedChat(chat.id)}>
            Chat with {chat.user2_id}
          </div>
        ))}
      </div>
      {selectedChat && <Chat chatId={selectedChat} userId={userId} />}
    </div>
  );
}

export default ChatDashboard;
