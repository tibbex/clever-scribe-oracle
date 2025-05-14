
import { useState } from "react";
import ChatInterface from "../components/ChatInterface";
import Header from "../components/Header";
import { Message } from "../types/chat";
import { handleChatRequest } from "../api/chat";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    try {
      // Call our API directly with the user's message
      const response = await handleChatRequest(content);
      
      // Add AI response to chat
      const aiMessage: Message = {
        role: "assistant",
        content: response.content,
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <main className="flex-1 overflow-hidden">
        <ChatInterface 
          messages={messages} 
          isLoading={isLoading} 
          error={error}
          onSendMessage={handleSendMessage} 
        />
      </main>
    </div>
  );
};

export default Index;
