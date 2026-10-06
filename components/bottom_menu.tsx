'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FaHome, FaCalendarAlt, FaTasks } from 'react-icons/fa';

const navItems = [
  { label: 'Home', icon: <FaHome className="w-5 h-5" />, path: '/home' },
  { label: 'Schedule', icon: <FaCalendarAlt className="w-5 h-5" />, path: '/home/schedule' },
  { label: 'Tasks', icon: <FaTasks className="w-5 h-5" />, path: '/home/tasks' },
];

export default function BottomMenu() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white border border-black/10 rounded-full shadow-xl px-6 py-3 flex items-center gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-black text-white'
                  : 'bg-black/5 text-black/40 hover:bg-black/10 hover:text-black/70'
              }`}
            >
              {item.icon}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
