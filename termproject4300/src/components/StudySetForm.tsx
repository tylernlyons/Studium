'use client';

import { useState } from "react";
import CreateDefinition from "./CreateDefinition";

export interface Term {
  term: string;
  definition: string;
}

export interface StudySetData {
  _id: number;
  title: string;
  url: string;
  terms: Term[];
}

interface StudySetFormProps {
  onAddSet: (set: StudySetData) => void;
}

const StudySetForm = ({ onAddSet }: StudySetFormProps) => {
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [terms, setTerms] = useState<Term[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newSet = {
      _id: Math.floor(Math.random() * 100000),
      title,
      url,
      terms,
    };

    try {
      console.log('Submitting study set:', newSet);

      const res = await fetch('/api/studysets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSet),
      });

      if (!res.ok) {
        throw new Error('Failed to create study set');
      }

      const data = await res.json();
      console.log('Successfully created study set:', data);

      onAddSet(newSet);
      setTitle('');
      setURL('');
      setTerms([]);
      setError("");
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError("There was an error creating the study set. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow space-y-4">
      <input
        type="text"
        placeholder="Set Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Image URL"
        value={url}
        onChange={(e) => setURL(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={isLoading}
      >
        Create Study Set
      </button>
    </form>
  );
};

export default StudySetForm;
