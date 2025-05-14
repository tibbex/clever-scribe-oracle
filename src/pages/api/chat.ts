
import { handleChatRequest } from "../../api/chat";

// This is a client-side API route simulation
// In a real application, this would be a server-side API route

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    const result = await handleChatRequest(message);
    
    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("API route error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An unknown error occurred" 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Re-export handler for fetch API compatibility
export default async function handler(req: Request) {
  if (req.method === "POST") {
    return POST(req);
  }
  
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}
