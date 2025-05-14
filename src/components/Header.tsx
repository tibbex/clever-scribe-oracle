
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import AuraLogo from "./AuraLogo";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center">
      <div className="flex items-center gap-2">
        <AuraLogo className="h-8" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          Aura AI
        </h1>
      </div>
      {user && (
        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user.name}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
