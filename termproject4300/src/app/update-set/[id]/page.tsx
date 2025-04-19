'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/Card';
import CreateDefinition from '@/components/CreateDefinition';
import Link from 'next/link';
import HoverDefinition from '@/components/HoverDefinition';

export default function UpdateStudySet() {
  const [studySet, setStudySet] = useState({
    title: '',
    url: '',
    terms: [] as { term: string; definition: string }[],
    newTerm: '',
  });
  const [loading, setLoading] = useState(false);

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
  const onDeleteClick = async () => {
    try {
      const response = await fetch(`/api/studysets/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      router.push('/show-sets');
    } catch (error) {
      console.log('Error in ShowItemDetails_deleteClick', error);
    }
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

  const handleDeleteTerm = async (termToDelete: string) => {
    try {
      const res = await fetch(`/api/studysets/${id}/terms`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ term: termToDelete }),
      });

      if (res.ok) {
        setStudySet((prev) => ({
          ...prev,
          terms: prev.terms.filter((t) => t.term !== termToDelete),
        }));
      } else {
        console.error('Failed to delete term');
      }
    } catch (error) {
      console.error('Error deleting term:', error);
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
      router.refresh();
      router.push(`/show-set/${id}`);
    } catch (err) {
      console.error('Error updating study set:', err);
    }
  };

  return (
    <div className="text-white max-w-lg mx-auto mt-10 px-4">
      <h2 className="text-lg font-semibold mt-2 mb-2">Edit Study Set</h2>
    
      <Card className='text-[#1b2d48]'>
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
            </div>
            <button
              type="button"
              onClick={handleAddTerm}
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-[#1b2d48] hover:bg-[#3a6098]'
                }`}
            >
              {loading ? 'Thinking...' : 'Define'}
            </button>
        

          {studySet.terms.map((term, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded mb-2">
              <div>
                <p className="font-semibold">{term.term}</p>
                <p className="text-sm text-gray-600">{term.definition}</p>
              </div>
              <button
                onClick={() => handleDeleteTerm(term.term)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
<div className='flex flex-row'>
          <Link
            href={'/show-sets'}
            onClick={onDeleteClick}
            className="mr-4 px-6 py-2 border border-gray-500 bg-red-700 text-white  hover:bg-red-500 hover:text-white transition rounded"
          >
            Delete set
          </Link>
          <button
            type="submit"
            className="bg-[#1b2d48] text-white px-4 py-2 rounded hover:bg-[#3a6098]"
          >
            Update Study Set
          </button>
          </div>
        </form>
      </Card>
      <HoverDefinition />
    </div>
  );
}
