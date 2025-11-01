"use client";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setIsLoading(true);

    setMessages((m) => [...m, "You: " + userMessage, "AI: Loading..."]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      // Replace loading message with actual AI response
      setMessages((m) => {
        const newMessages = [...m];
        newMessages[newMessages.length - 1] = "AI: " + data.reply;
        return newMessages;
      });
    } catch (error) {
      setMessages((m) => {
        const newMessages = [...m];
        newMessages[newMessages.length - 1] = "AI: Error - Please try again";
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1 className="chat-title">Cloudflare AI Chat Project</h1>
        <p className="chat-subtitle">
          AI Chat with Durable Memory on Cloudflare
        </p>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="messages-empty">
            Start a conversation with the AI assistant...
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className="message">
              <div
                className={
                  m.startsWith("You:")
                    ? "message-user"
                    : m.includes("Loading...")
                    ? "message-loading"
                    : "message-ai"
                }
              >
                {m}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="input-container">
        <input
          className="message-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="send-button"
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
