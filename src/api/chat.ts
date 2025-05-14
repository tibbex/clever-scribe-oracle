
// In a real application, this would be a server-side API endpoint
// For the purposes of this demo, we'll create a client-side mock API

export async function handleChatRequest(message: string) {
  // This sends the user's message to the Qwen3-235B-A22B model via HuggingFace
  
  try {
    const response = await fetch("https://router.huggingface.co/nscale/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: message, // User's message is sent here
          }
        ],
        model: "Qwen/Qwen3-235B-A22B"
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "Failed to get a response from the API");
    }
    
    return {
      content: data.choices[0].message.content,
    };
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}
