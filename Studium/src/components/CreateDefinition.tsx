const CreateDefinition = async (term: string): Promise<string> => {
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ term }),
    });

    if (!res.ok) {
      const errorPayload = await res.json().catch(() => null);
      return errorPayload?.error || 'Error retrieving definition.';
    }

    const data = await res.json();

    if (data.definition) return data.definition;
    return 'Definition not found.';
  } catch (err) {
    console.error('Error fetching from API route:', err);
    return 'Error retrieving definition.';
  }
};

export default CreateDefinition;
