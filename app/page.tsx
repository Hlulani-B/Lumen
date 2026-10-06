'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('surname');

    if (name && surname) {
      router.push('/home');
    } else {
      router.push('/getting_started');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse text-black/40 text-lg">Loading...</div>
    </div>
  );
}
