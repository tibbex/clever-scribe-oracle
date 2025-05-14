
import { MessageSquare } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-blue-600" />
        <h1 className="text-xl font-semibold text-gray-800">AI Chat Assistant</h1>
      </div>
      <div className="ml-auto text-sm text-gray-500">
        Powered by Qwen3-235B-A22B
      </div>
    </header>
  );
};

export default Header;
