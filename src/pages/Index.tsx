
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If user is logged in, go to chat, otherwise go to sign in
  if (user) {
    return <Navigate to="/chat" replace />;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

export default Index;
