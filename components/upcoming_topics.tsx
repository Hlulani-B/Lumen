'use client';

import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';

interface UpcomingTopic {
  topic: string;
  subject: string;
  date: string;
}

interface UpcomingTopicsProps {
  topics?: UpcomingTopic[];
}

export default function UpcomingTopics({ topics = [] }: UpcomingTopicsProps) {
  const router = useRouter();

  // Mock data if no topics provided
  const displayTopics = topics.length > 0 ? topics : [
    { topic: 'Algebra: Quadratic Equations', subject: 'Mathematics', date: 'Oct 6, 2026' },
    { topic: 'Cell Division: Mitosis', subject: 'Biology', date: 'Oct 7, 2026' },
    { topic: 'Newton\'s Laws of Motion', subject: 'Physics', date: 'Oct 8, 2026' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Upcoming Topics</h3>
        <button
          onClick={() => router.push('/home/schedule')}
          className="text-black/40 hover:text-black transition-colors"
        >
          <FaArrowRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayTopics.map((item, index) => (
          <div
            key={index}
            className="border border-black/10 rounded-xl p-5 h-40 flex flex-col justify-between"
          >
            <p className="text-sm text-black/40">{item.topic}</p>
            <p className="text-xs text-black/30">{item.date}</p>
            <p className="text-base font-bold text-black">{item.subject}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
