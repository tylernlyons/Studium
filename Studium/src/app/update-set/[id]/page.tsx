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
    isPublic: true,
  });
  const [loading, setLoading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [deleteError, setDeleteError] = useState("");

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
        isPublic: data.studySet.isPublic ?? true,
      });
    };
    fetchStudySet();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudySet(prev => ({
      ...prev,
      [name]: name === "isPublic" ? value === "public" : value,
    }));
  };
  const onDeleteClick = async () => {
    try {
      setDeleteError("");
      const response = await fetch(`/api/studysets/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        setDeleteError("Unable to delete this set.");
        return;
      }
      router.push('/focusMode');
    } catch (error) {
      console.log('Error in ShowItemDetails_deleteClick', error);
      setDeleteError("Unable to delete this set.");
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
      const res = await fetch(`/api/studysets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studySet),
      });
      if (!res.ok) {
        setSaveError("Unable to save this set. Please refresh and try again.");
        return;
      }
      setSaveError("");
      router.refresh();
      router.push(`/show-set/${id}`);
    } catch (err) {
      console.error('Error updating study set:', err);
      setSaveError("Unable to save this set. Please refresh and try again.");
    }
  };

  return (
    <div className="app-shell text-white max-w-lg mx-auto mt-4 px-4">
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
            className="app-input"
          />
          <input
            name="url"
            type="url"
            value={studySet.url}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="app-input"
          />
          <select
            name="isPublic"
            value={studySet.isPublic ? "public" : "private"}
            onChange={handleChange}
            className="app-input"
          >
            <option value="public">Public set</option>
            <option value="private">Private set</option>
          </select>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Add Term"
              value={studySet.newTerm}
              onChange={(e) =>
                setStudySet(prev => ({ ...prev, newTerm: e.target.value }))
              }
              className="app-input flex-1"
            />
          </div>
          <button
            type="button"
            onClick={handleAddTerm}
            disabled={loading}
            className={`${loading ? 'bg-gray-400 text-white px-4 py-2 rounded-full' : 'app-btn-primary'
              }`}
          >
            {loading ? 'Thinking...' : 'Define'}
          </button>


          {studySet.terms.map((term, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-[#1b2d48]/15 rounded-lg mb-2 bg-white/60">
              <div>
                <p className="font-semibold">{term.term}</p>
                <p className="text-sm text-gray-600">{term.definition}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteTerm(term.term)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
          <div className='flex flex-row'>
            <button
              type="button"
              onClick={onDeleteClick}
              className="mr-4 app-btn-danger text-left"
            >
              Delete set
            </button>
            <button
              type="submit"
              className="app-btn-primary"
            >
              Update Study Set
            </button>
          </div>
          {saveError && <p className="text-sm text-red-600">{saveError}</p>}
          {deleteError && <p className="text-sm text-red-600">{deleteError}</p>}
        </form>
      </Card>
      <HoverDefinition />
    </div>
  );
}
