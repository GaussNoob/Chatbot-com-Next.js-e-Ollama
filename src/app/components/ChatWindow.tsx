import React, { useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import { LoadingDots } from "./LoadingDots";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-800 rounded-t-xl">
      <div className="flex flex-col space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="self-start">
            <MessageBubble
              message={{
                id: "loading",
                sender: "bot",
                text: "",
                timestamp: "",
              }}
            >
              <LoadingDots />
            </MessageBubble>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
