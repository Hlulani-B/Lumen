'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Slides from './slides';
import {
  FaCalendarAlt,
  FaTasks,
  FaBookOpen,
  FaChartLine,
  FaBrain,
  FaClock,
} from 'react-icons/fa';

const features = [
  {
    icon: <FaBookOpen className="w-8 h-8" />,
    title: 'Subject Management',
    description: 'Organize all your subjects in one place with detailed descriptions and notes.',
  },
  {
    icon: <FaCalendarAlt className="w-8 h-8" />,
    title: 'Smart Scheduling',
    description: 'Create weekly schedules and never miss a class or study session.',
  },
  {
    icon: <FaTasks className="w-8 h-8" />,
    title: 'Task Tracking',
    description: 'Keep track of assignments, projects, and exams with priority levels.',
  },
  {
    icon: <FaChartLine className="w-8 h-8" />,
    title: 'Progress Monitoring',
    description: 'Track your academic progress and stay on top of your goals.',
  },
  {
    icon: <FaBrain className="w-8 h-8" />,
    title: 'Study Tips',
    description: 'Get built-in tips and techniques for more effective studying.',
  },
  {
    icon: <FaClock className="w-8 h-8" />,
    title: 'Time Management',
    description: 'Learn to allocate your time wisely across subjects and tasks.',
  },
];

const studyTips = [
  'Use the Pomodoro Technique: 25 min study, 5 min break',
  'Review notes within 24 hours of class for better retention',
  'Teach concepts to someone else to solidify understanding',
  'Break large tasks into smaller, manageable chunks',
  'Study in a distraction-free environment',
];

export default function GettingStarted() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleGetStarted = () => {
    if (name.trim() && surname.trim()) {
      localStorage.setItem('name', name.trim());
      localStorage.setItem('surname', surname.trim());
      router.push('/home');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* What is StudyPlanner */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-5xl font-bold mb-6 tracking-tight">
              Lumen
            </h2>
            <div className="w-16 h-1 bg-black" />
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-black/80 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Hero Section with Slides */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <Slides />
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 border border-black/10 rounded-xl hover:border-black hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4 text-black/70 group-hover:text-black transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-black/50 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Study Better */}
      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">How to Study Better</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {studyTips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 border border-white/30 rounded-xl hover:border-white/60 transition-colors"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <p className="text-white/80 text-sm leading-relaxed pt-1">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl z-10">
            <h3 className="text-2xl font-bold mb-2 text-center">Welcome!</h3>
            <p className="text-black/50 text-sm text-center mb-6">
              Enter your details to get started.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
              />
              <input
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="px-4 py-2 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
              />
              <button
                onClick={handleGetStarted}
                disabled={!name.trim() || !surname.trim()}
                className="mt-2 px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-black/80 transition-colors disabled:bg-black/20 disabled:cursor-not-allowed"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-black/10 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-black/40 text-sm">
          <p>Lumen — Plan smarter, study better.</p>
        </div>
      </footer>
    </div>
  );
}
