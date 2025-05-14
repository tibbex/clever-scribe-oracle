
import { cn } from "@/lib/utils";
import { Message } from "../types/chat";
import { format } from "date-fns";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";
  
  return (
    <div
      className={cn(
        "flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isUser
            ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
            : "bg-white border border-gray-200 text-gray-800"
        )}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        <div
          className={cn(
            "text-xs mt-1",
            isUser ? "text-indigo-100" : "text-gray-400"
          )}
        >
          {message.timestamp && format(new Date(message.timestamp), "HH:mm")}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
