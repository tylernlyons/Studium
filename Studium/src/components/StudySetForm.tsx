'use client';

import { useState } from "react";

export interface Term {
  term: string;
  definition: string;
}

export interface StudySetData {
  _id: string | number;
  title: string;
  url: string;
  terms: Term[];
  isPublic?: boolean;
  ownerName?: string;
}

interface StudySetFormProps {
  onAddSet: (set: StudySetData) => void; // Callback to pass the created set back to parent
}

const StudySetForm = ({ onAddSet }: StudySetFormProps) => {
  const [title, setTitle] = useState(""); 
  const [url, setURL] = useState("");     
  const [terms, setTerms] = useState<Term[]>([]);
  const [error, setError] = useState("");

  // Submit form to create a new study set
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newSet: StudySetData = {
      _id: Math.floor(Math.random() * 100000), // Generate random ID (for local use)
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

      // Add the new set to the parent and reset form
      onAddSet(newSet);
      setTitle('');
      setURL('');
      setTerms([]);
      setError('');
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError("There was an error creating the study set. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="app-panel p-4 space-y-4 text-[#1b2d48]">
      {/* Title input */}
      <input
        type="text"
        placeholder="Set Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="app-input"
      />

      {/* Image URL input */}
      <input
        type="text"
        placeholder="Image URL"
        value={url}
        onChange={(e) => setURL(e.target.value)}
        className="app-input"
      />

      {/* Error message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit button */}
      <button
        type="submit"
        className="app-btn-secondary"
      >
        Create Study Set
      </button>
    </form>
  );
};

export default StudySetForm;
