const CreateDefinition = async (term: string): Promise<string> => {
  try {
    const APIBody = {
      model: "gpt-4o-mini", // Using the GPT-4o-mini model
      messages: [
        { role: "system", content: "You are a helpful assistant that defines terms concisely." },
        { role: "user", content: `Define the following term in around 10 words: ${term}` }
      ],
      temperature: 0.5,     // Controls randomness of response
      max_tokens: 30        // Max response length
    };

    // Send POST request to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // Use env var for security
      },
      body: JSON.stringify(APIBody),
    });

    const data = await response.json();

    // Return trimmed response content, or fallback if undefined
    return data.choices?.[0]?.message?.content?.trim() || "Definition not found.";
  } catch (error) {
    console.error("Error fetching definition:", error);
    return "Error retrieving definition."; // Fallback on failure
  }
};

export default CreateDefinition;
