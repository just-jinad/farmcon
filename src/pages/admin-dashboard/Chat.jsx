import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

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
          const response = await axios.get(
            `http://localhost:8888/messages/${chatId}`
          );
          console.log("Fetched messages:", response.data); // Debugging
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();

    if (chatId) {
      socket.emit("joinChat", { chatId });
      console.log(`Joined chat with ID: ${chatId}`); // Debugging

      socket.on("receiveMessage", (msg) => {
        console.log("New message received:", msg); // Debugging
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      return () => {
        socket.off("receiveMessage");
        console.log("Socket event listener removed."); // Debugging
      };
    }
  }, [chatId]);

  useEffect(() => {
    const savedChatId = localStorage.getItem("activeChatId");
    if (savedChatId) {
      console.log(`Restoring saved chat ID: ${savedChatId}`); // Debugging
      setChatId(savedChatId);
    }
  }, []);

  useEffect(() => {
    if (chatId) {
      console.log(`Saving chat ID to localStorage: ${chatId}`); // Debugging
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

      console.log("Chat started with ID:", response.data.chatId); // Debugging
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
        content: message.trim(),
      };

      console.log("Sending message:", newMessage); // Debugging
      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white p-4 border-b shadow-sm flex items-center justify-between">
        <input
          type="text"
          value={userToChatWith}
          onChange={(e) => setUserToChatWith(e.target.value)}
          placeholder="Enter user ID to chat with..."
          className="border rounded-lg p-2 w-full max-w-xs"
        />
        <button
          onClick={startChat}
          disabled={isLoading}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {isLoading ? "Starting Chat..." : "Start Chat"}
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length > 0 ? (
          messages
            .sort(
              (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            ) // Sort by timestamp
            .map((msg, index) => {
              const messageDate = new Date(msg.created_at);

              // Determine whether the message was sent by the current user or the other user
              const isCurrentUser =
                String(msg.sender_id) === String(currentUserId);
              console.log("testing for the current user is " + isCurrentUser);
              console.log("msg id " + msg.sender_id);
              console.log("Message object:", JSON.stringify(msg, null, 2));
              console.log("the current user id " + currentUserId);

              return (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Message Block */}
                  <div
                    className={`p-3 rounded-lg max-w-xs ${
                      isCurrentUser
                        ? "bg-green-500 text-white text-right"
                        : "bg-gray-200 text-black text-left"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span className="block text-xs mt-1 text-gray-200">
                      {messageDate instanceof Date && !isNaN(messageDate)
                        ? messageDate.toLocaleTimeString()
                        : "Invalid Date"}
                    </span>
                  </div>
                </div>
              );
            })
        ) : (
          <div className="text-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>

      <div className="bg-white p-4 border-t shadow-sm flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!chatId}
          className="border rounded-lg p-2 w-full"
        />
        <button
          onClick={sendMessage}
          disabled={!chatId}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
