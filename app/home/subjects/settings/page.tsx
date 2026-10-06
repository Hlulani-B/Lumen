'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

const colorOptions = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Green', value: '#10B981' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Yellow', value: '#F59E0B' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Teal', value: '#14B8A6' },
];

export default function SettingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('id');
  
  const [subjectName, setSubjectName] = useState('');
  const [subjectDescription, setSubjectDescription] = useState('');
  const [subjectColor, setSubjectColor] = useState('#3B82F6');
  const [topics, setTopics] = useState<{ id: number; title: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subjectId) return;
    
    // Fetch subject data
    fetch(`/api/subjects?id=${subjectId}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setSubjectName(data.name || '');
          setSubjectDescription(data.description || '');
          setSubjectColor(data.color || '#3B82F6');
        }
      })
      .catch(err => console.error('Failed to fetch subject:', err));

    // Fetch topics
    fetch(`/api/topics?subjectId=${subjectId}`)
      .then(res => res.json())
      .then(data => {
        setTopics(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch topics:', err);
        setLoading(false);
      });
  }, [subjectId]);

  const updateTopicName = (id: number, newName: string) => {
    setTopics(topics.map(t => t.id === id ? { ...t, title: newName } : t));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Update subject
      await fetch('/api/subjects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: parseInt(subjectId || '0'),
          name: subjectName,
          description: subjectDescription,
          color: subjectColor,
        }),
      });

      // Update topics
      for (const topic of topics) {
        await fetch('/api/topics', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: topic.id,
            title: topic.title,
          }),
        });
      }

      router.push('/home/topics');
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-black/10">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <button
            onClick={() => router.push('/home/topics')}
            className="text-black/40 hover:text-black transition-colors"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Subject Settings</h1>
        </div>
      </header>

      {loading ? (
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-black/40">
          Loading...
        </div>
      ) : (
        <main className="max-w-4xl mx-auto px-6 py-8">
          <form onSubmit={handleSave} className="space-y-8">
          {/* Subject Details */}
          <section>
            <h2 className="text-lg font-bold mb-4">Subject Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="subjectName" className="block text-sm font-medium mb-2">
                  Subject Name
                </label>
                <input
                  id="subjectName"
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="subjectDescription" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="subjectDescription"
                  value={subjectDescription}
                  onChange={(e) => setSubjectDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>
            </div>
          </section>

          {/* Subject Color */}
          <section>
            <h2 className="text-lg font-bold mb-4">Subject Color</h2>
            <div className="grid grid-cols-4 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSubjectColor(color.value)}
                  className={`
                    h-20 rounded-lg border-2 transition-all
                    ${subjectColor === color.value ? 'border-black scale-105' : 'border-transparent'}
                  `}
                  style={{ backgroundColor: color.value }}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
            <p className="text-sm text-black/40 mt-3">Selected: {colorOptions.find(c => c.value === subjectColor)?.name}</p>
          </section>

          {/* Topics */}
          <section>
            <h2 className="text-lg font-bold mb-4">Topics</h2>
            <div className="space-y-3">
              {topics.map((topic) => (
                <div key={topic.id}>
                  <label className="block text-xs text-black/40 mb-1">Topic {topic.id}</label>
                  <input
                    type="text"
                    value={topic.title}
                    onChange={(e) => updateTopicName(topic.id, e.target.value)}
                    className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end gap-3 pt-4 border-t border-black/10">
            <button
              type="button"
              onClick={() => router.push('/home/topics')}
              className="px-6 py-3 border border-black/20 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/80 transition-colors disabled:bg-black/40 flex items-center gap-2"
            >
              <FaSave className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
        </main>
      )}
    </div>
  );
}
