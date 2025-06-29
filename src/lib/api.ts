export async function sendMessageToAPI(
  message: string,
  model: string = "mistralai/mistral-7b-instruct"
) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  try {
    const response: Response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: "user", content: message }],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send message to API: ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error sending message to API:", error);
    return "The AI ​​was unable to respond. Please try again shortly.";
  }
}
