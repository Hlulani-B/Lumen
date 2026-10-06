'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomMenu from '@/components/bottom_menu';
import Stats from '@/components/stats';
import UpcomingTopics from '@/components/upcoming_topics';
import RecentSubjects from '@/components/recent_subjects';

export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('surname');

    if (!name || !surname) {
      router.push('/getting_started');
    } else {
      setUserName(`${name} ${surname}`);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            Lumen
          </h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-6">
        <p className="text-2xl font-bold text-black">Welcome, {userName}</p>
      </div>

      <Stats />

      <div className="max-w-6xl mx-auto px-6">
        <div className="w-full h-0.5 bg-black/10" />
      </div>

      <UpcomingTopics />

      <div className="max-w-6xl mx-auto px-6">
        <div className="w-full h-0.5 bg-black/10" />
      </div>

      <RecentSubjects />

      <main className="max-w-6xl mx-auto px-6 py-16 pb-24">
      </main>

      <BottomMenu />
    </div>
  );
}
