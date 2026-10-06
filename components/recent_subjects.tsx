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

  // Mock data if no subjects provided
  const displaySubjects = subjects.length > 0 ? subjects : [
    { id: 1, name: 'Mathematics', description: 'Algebra, Calculus & Geometry' },
    { id: 2, name: 'Biology', description: 'Cell Biology & Ecology' },
    { id: 3, name: 'Physics', description: 'Mechanics & Thermodynamics' },
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displaySubjects.map((subject) => (
          <div
            key={subject.id}
            className="border border-black/10 rounded-xl p-5"
          >
            <h4 className="text-base font-bold text-black mb-1">{subject.name}</h4>
            <p className="text-sm text-black/40">{subject.description || 'No description'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
