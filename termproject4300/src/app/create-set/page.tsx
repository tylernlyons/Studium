'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';

export default function CreateStudySet() {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/studysets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to create');
      router.push('/show-sets');
    } catch (err) {
      console.error('Error creating study set:', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 px-4">
      <h2 className="text-lg font-semibold mt-2">Create a Study Set</h2>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="url"
            type="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 mt-4"
          >
            Add Study Set
          </button>
        </form>
      </Card>
    </div>
  );
}
