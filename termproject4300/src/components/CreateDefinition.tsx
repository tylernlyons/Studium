const CreateDefinition = async (term: string): Promise<string> => {
  try {
    const APIBody = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant that defines terms concisely." },
        { role: "user", content: `Define the following term in around 10 words: ${term}` }
      ],
      temperature: 0.5,
      max_tokens: 30
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify(APIBody),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || "Definition not found.";
  } catch (error) {
    console.error("Error fetching definition:", error);
    return "Error retrieving definition.";
  }
};

export default CreateDefinition;
