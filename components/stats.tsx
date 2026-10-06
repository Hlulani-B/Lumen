'use client';

import { FaBook, FaCalendarAlt, FaTasks, FaCheckCircle } from 'react-icons/fa';

interface StatsProps {
  subjectsCount?: number;
  schedulesCount?: number;
  totalTasks?: number;
  completedTasks?: number;
}

export default function Stats({
  subjectsCount = 0,
  schedulesCount = 0,
  totalTasks = 0,
  completedTasks = 0,
}: StatsProps) {
  const stats = [
    {
      label: 'Subjects',
      value: subjectsCount,
      icon: <FaBook className="w-6 h-6" />,
    },
    {
      label: 'Schedules',
      value: schedulesCount,
      icon: <FaCalendarAlt className="w-6 h-6" />,
    },
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: <FaTasks className="w-6 h-6" />,
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: <FaCheckCircle className="w-6 h-6" />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-black/20 rounded-2xl p-5 shadow-md flex flex-col items-center text-center"
          >
            <div className="text-black/60 mb-3">{stat.icon}</div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-black/50 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
