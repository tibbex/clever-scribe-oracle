
import { useRef, useEffect } from "react";
import { Message } from "../types/chat";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import AuraLogo from "./AuraLogo";

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSendMessage: (message: string) => void;
}

const ChatInterface = ({
  messages,
  isLoading,
  error,
  onSendMessage,
}: ChatInterfaceProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <AuraLogo className="w-28 h-28 mb-6" />
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
              Hello, {user?.name || "there"}!
            </h2>
            <div className="max-w-md space-y-4 text-gray-600">
              <p>
                I'm Aura, your AI assistant. How can I help you today?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                <SuggestionButton 
                  onClick={() => onSendMessage("Tell me a fun fact about space")}
                  text="Tell me a fun fact about space"
                />
                <SuggestionButton 
                  onClick={() => onSendMessage("What can you do?")}
                  text="What can you do?"
                />
                <SuggestionButton 
                  onClick={() => onSendMessage("Write a short poem about nature")}
                  text="Write a short poem about nature"
                />
                <SuggestionButton 
                  onClick={() => onSendMessage("How do I stay productive?")}
                  text="How do I stay productive?"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-500 px-4 py-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Aura is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

// Suggestion button for the empty state
const SuggestionButton = ({ onClick, text }: { onClick: () => void, text: string }) => (
  <button
    onClick={onClick}
    className="p-3 border border-gray-200 rounded-lg text-sm text-left hover:bg-gray-50 transition-colors"
  >
    {text}
  </button>
);

export default ChatInterface;
