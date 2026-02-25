'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';

export default function CreateStudySet() {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    isPublic: true,
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "isPublic" ? value === "public" : value,
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
      router.push('/focusMode');
    } catch (err) {
      console.error('Error creating study set:', err);
    }
  };

  return (
    <div className="app-shell max-w-lg mx-auto mt-4 px-4">
      <h2 className="text-xl font-semibold mt-2 mb-2 text-white">Create a Study Set</h2>
      <Card className="text-[#1b2d48]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="app-input"
          />
          <input
            name="url"
            type="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="app-input"
          />
          <select
            name="isPublic"
            value={formData.isPublic ? "public" : "private"}
            onChange={handleChange}
            className="app-input"
          >
            <option value="public">Public set</option>
            <option value="private">Private set</option>
          </select>
          <button
            type="submit"
            className="app-btn-primary mt-2"
          >
            Add Study Set
          </button>
        </form>
      </Card>
    </div>
  );
}
