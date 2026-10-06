'use client';

import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';

interface Subject {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
}

interface RecentSubjectsProps {
  subjects?: Subject[];
}

export default function RecentSubjects({ subjects = [] }: RecentSubjectsProps) {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Subjects</h3>
        <button
          onClick={() => router.push('/home/subjects')}
          className="text-black/40 hover:text-black transition-colors"
        >
          <FaArrowRight className="w-5 h-5" />
        </button>
      </div>
      {subjects.length === 0 ? (
        <div className="border border-black/10 rounded-xl p-8 text-center">
          <p className="text-black/40 text-sm">No subjects yet</p>
          <p className="text-black/30 text-xs mt-2">Create your first subject to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="border border-black/10 rounded-xl p-5 shadow-md hover:shadow-lg transition-all"
            >
              <h4 className="text-base font-bold text-black mb-1">{subject.name}</h4>
              <p className="text-sm text-black/40">{subject.description || 'No description'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
