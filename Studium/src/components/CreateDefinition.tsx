const CreateDefinition = async (term: string): Promise<string> => {
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ term }),
    });

    const data = await res.json();

    if (data.definition) return data.definition;
    return 'Definition not found.';
  } catch (err) {
    console.error('Error fetching from API route:', err);
    return 'Error retrieving definition.';
  }
};

export default CreateDefinition;
