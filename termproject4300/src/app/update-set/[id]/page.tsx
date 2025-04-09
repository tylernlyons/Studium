'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/Card';
import CreateDefinition from '@/components/CreateDefinition';
import HoverDefinition from '@/components/HoverDefinition';

export default function UpdateStudySet() {
  const [studySet, setStudySet] = useState({
    title: '',
    url: '',
    terms: [] as { term: string; definition: string }[],
    newTerm: '',
  });
  const [loading, setLoading] = useState(false); // <- Loading state

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchStudySet = async () => {
      const res = await fetch(`/api/studysets/${id}`);
      const data = await res.json();
      setStudySet({
        title: data.studySet.title,
        url: data.studySet.url,
        terms: data.studySet.terms || [],
        newTerm: '',
      });
    };
    fetchStudySet();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudySet(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTerm = async () => {
    if (studySet.newTerm.trim()) {
      setLoading(true);
      try {
        const definition = await CreateDefinition(studySet.newTerm);
        setStudySet(prev => ({
          ...prev,
          terms: [...prev.terms, { term: studySet.newTerm, definition }],
          newTerm: '',
        }));
      } catch (err) {
        console.error('Error fetching definition:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`/api/studysets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studySet),
      });
      router.push(`/show-set/${id}`);
    } catch (err) {
      console.error('Error updating study set:', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 px-4">
      <h2 className="text-lg font-semibold mt-2">Edit Study Set</h2>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            value={studySet.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="url"
            type="url"
            value={studySet.url}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Add Term"
              value={studySet.newTerm}
              onChange={(e) =>
                setStudySet(prev => ({ ...prev, newTerm: e.target.value }))
              }
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={handleAddTerm}
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
              {loading ? 'Thinking...' : 'Define'}
            </button>
          </div>

          <ul>
            {studySet.terms.map((t, i) => (
              <li key={i}>
                <strong>{t.term}</strong>: {t.definition}
              </li>
            ))}
          </ul>

          <button
            type="submit"
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Update Study Set
          </button>
        </form>
      </Card>
      <HoverDefinition />
    </div>
  );
}
