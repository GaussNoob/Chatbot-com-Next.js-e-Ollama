import React from "react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

interface MessageBubbleProps {
  message: Message;
  children?: React.ReactNode;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  children,
}) => {
  const isUser = message.sender === "user";
  const bubbleClasses = isUser
    ? "bg-blue-700 text-white self-end rounded-br-none"
    : "bg-gray-700 text-gray-100 self-start rounded-bl-none";

  return (
    <div
      className={`flex max-w-[70%] p-3 rounded-xl shadow-md ${bubbleClasses}`}
    >
      <div className="flex flex-col">
        {children || <p className="text-sm break-words">{message.text}</p>}
        {message.timestamp && (
          <span
            className={`text-[10px] mt-1 ${isUser ? "text-blue-300" : "text-gray-400"} self-end`}
          >
            {message.timestamp}
          </span>
        )}
      </div>
    </div>
  );
};
