'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';

export default function SubjectsPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch subjects from API
  useEffect(() => {
    fetch('/api/subjects')
      .then(res => res.json())
      .then(data => setSubjects(data || []))
      .catch(err => console.error('Failed to fetch subjects:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Subject name is required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create subject');
      }

      // Reset form and close modal
      setName('');
      setDescription('');
      setShowModal(false);
      
      // Refresh subjects list
      fetch('/api/subjects')
        .then(res => res.json())
        .then(data => setSubjects(data || []))
        .catch(err => console.error('Failed to refresh subjects:', err));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/home')}
              className="text-black/40 hover:text-black transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold tracking-tight">Subjects</h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            <FaPlus className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {subjects.length === 0 ? (
          <div className="border border-black/10 rounded-xl p-12 text-center">
            <p className="text-black/40 text-base mb-2">No subjects yet</p>
            <p className="text-black/30 text-sm">Click the + button to create your first subject</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject: any) => (
              <div
                key={subject.id}
                onClick={() => router.push(`/home/topics?id=${subject.id}`)}
                className="border border-black/10 rounded-xl p-5 shadow-md hover:shadow-lg hover:border-black/30 transition-all cursor-pointer"
              >
                <h4 className="text-base font-bold text-black mb-1">{subject.name}</h4>
                <p className="text-sm text-black/40">{subject.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Subject Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => !loading && setShowModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl z-10">
            <h3 className="text-2xl font-bold mb-6 text-center">Add Subject</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Subject Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Mathematics"
                  className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description"
                  rows={3}
                  className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setName('');
                    setDescription('');
                    setError('');
                  }}
                  className="flex-1 px-6 py-3 border border-black/20 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/80 transition-colors disabled:bg-black/40 disabled:cursor-not-allowed"
                >
                  {loading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
