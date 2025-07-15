"use client";

import { useState } from "react";
import { ChatInput } from "./components/ChatInput";
import { ChatWindow } from "./components/ChatWindow";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatbotName = process.env.NEXT_PUBLIC_CHATBOT_NAME || "Meu Chatbot";

  const handleSendMessage = async (text: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString() + "user",
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    const botMessageId = Date.now().toString() + "bot";
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: botMessageId,
        sender: "bot",
        text: "",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }),
      });

      if (!response.ok || !response.body) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value, { stream: true });
        accumulatedResponse += chunk;

        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, text: accumulatedResponse }
              : msg,
          ),
        );
      }
    } catch (error) {
      console.error("Erro ao chamar a API Ollama ou processar stream:", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
              }
            : msg,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100">
      <header className="p-4 bg-gray-900 shadow-lg border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">{chatbotName}</h1>{" "}
        {/* Usando a variável aqui */}
      </header>
      <main className="flex flex-1 p-4 overflow-hidden">
        <div className="flex flex-col flex-1 bg-gray-800 rounded-xl shadow-2xl">
          <ChatWindow messages={messages} isLoading={isLoading} />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
