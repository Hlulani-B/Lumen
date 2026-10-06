'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaPlus, FaBars, FaTimes, FaCog } from 'react-icons/fa';

const mockCourse = {
  name: 'Mathematics',
  description: 'Algebra, Calculus & Geometry',
};

const mockTopics = [
  { id: 1, title: 'Quadratic Equations', date: 'Oct 6, 2026' },
  { id: 2, title: 'Linear Functions', date: 'Oct 8, 2026' },
  { id: 3, title: 'Trigonometry Basics', date: 'Oct 10, 2026' },
  { id: 4, title: 'Calculus Introduction', date: 'Oct 12, 2026' },
  { id: 5, title: 'Geometry: Circles', date: 'Oct 14, 2026' },
];

export default function TopicsPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [materialType, setMaterialType] = useState<'link' | 'pdf' | 'doc' | 'image' | 'video'>('link');
  const [materialName, setMaterialName] = useState('');
  const [materialUrl, setMaterialUrl] = useState('');
  const [materialSize, setMaterialSize] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-4">
          <button
            onClick={() => router.push('/home/subjects')}
            className="text-black/40 hover:text-black transition-colors"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">{mockCourse.name}</h1>
            <p className="text-sm text-black/40">{mockCourse.description}</p>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-black hover:text-black/70 transition-colors"
          >
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div className="flex h-full relative">
        {/* Mobile Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Left Sidebar - Topics List */}
        <aside
          className={`
            w-80 flex-shrink-0 px-6 py-8 border-r border-black/10
            fixed md:relative inset-y-0 left-0 z-40
            transform transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            bg-white md:bg-transparent
            flex flex-col
          `}
        >
          <h2 className="text-lg font-bold mb-4">Topics</h2>
          <div className="space-y-2 flex-1">
            {mockTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setIsMobileMenuOpen(false)}
                className="border border-black/10 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-black/30 transition-all cursor-pointer"
              >
                <h3 className="text-sm font-medium text-black">{topic.title}</h3>
                <p className="text-xs text-black/30 mt-1">{topic.date}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push('/home/subjects/settings?id=1')}
            className="w-full mt-6 px-4 py-3 border border-black/20 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors flex items-center justify-center gap-2"
          >
            <FaCog className="w-4 h-4" />
            Settings
          </button>
        </aside>

        {/* Right Side */}
        <main className="flex-1 px-6 py-8">
          {/* Schedule Section */}
          <section className="mb-8">
            <p className="text-2xl font-bold text-black mb-2">Quadratic Equations</p>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Schedule</h2>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
            <div className="border border-black/20 rounded-xl p-5 shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Monday</p>
                    <p className="text-xs text-black/40">Room 101</p>
                  </div>
                  <p className="text-sm text-black/60">09:00 - 10:30</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Wednesday</p>
                    <p className="text-xs text-black/40">Room 203</p>
                  </div>
                  <p className="text-sm text-black/60">14:00 - 15:30</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Friday</p>
                    <p className="text-xs text-black/40">Online</p>
                  </div>
                  <p className="text-sm text-black/60">11:00 - 12:30</p>
                </div>
              </div>
            </div>
          </section>

          {/* Notes Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Notes</h2>
              <button
                onClick={() => setShowNoteModal(true)}
                className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="border border-black/10 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-black/30 transition-all cursor-pointer">
                <p className="text-sm font-medium">Key Formulas</p>
                <p className="text-xs text-black/40 mt-1">Updated: Oct 5, 2026</p>
              </div>
              <div className="border border-black/10 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-black/30 transition-all cursor-pointer">
                <p className="text-sm font-medium">Study Summary</p>
                <p className="text-xs text-black/40 mt-1">Updated: Oct 4, 2026</p>
              </div>
            </div>
          </section>

          {/* Materials Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Materials</h2>
              <button
                onClick={() => setShowMaterialModal(true)}
                className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="border border-black/10 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-black/30 transition-all cursor-pointer">
                <p className="text-sm font-medium">Chapter 1: Introduction to Algebra</p>
                <p className="text-xs text-black/40 mt-1">PDF • 2.3 MB</p>
              </div>
              <div className="border border-black/10 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-black/30 transition-all cursor-pointer">
                <p className="text-sm font-medium">Practice Problems Set 1</p>
                <p className="text-xs text-black/40 mt-1">PDF • 1.1 MB</p>
              </div>
              <div className="border border-black/10 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-black/30 transition-all cursor-pointer">
                <p className="text-sm font-medium">Video: Quadratic Equations Explained</p>
                <p className="text-xs text-black/40 mt-1">MP4 • 45 min</p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Add Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowScheduleModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl z-10">
            <h3 className="text-2xl font-bold mb-6 text-center">Add Schedule</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: submit to API
                setShowScheduleModal(false);
                setDay('');
                setStartTime('');
                setEndTime('');
                setLocation('');
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="day" className="block text-sm font-medium mb-2">
                  Day of Week <span className="text-red-500">*</span>
                </label>
                <select
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                  required
                >
                  <option value="">Select a day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Room 101, Online"
                  className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowScheduleModal(false);
                    setDay('');
                    setStartTime('');
                    setEndTime('');
                    setLocation('');
                  }}
                  className="flex-1 px-6 py-3 border border-black/20 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/80 transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Material Modal */}
      {showMaterialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMaterialModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl z-10">
            <h3 className="text-2xl font-bold mb-6 text-center">Add Material</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: submit to API
                setShowMaterialModal(false);
                setMaterialName('');
                setMaterialUrl('');
                setMaterialSize('');
                setMaterialType('link');
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="materialType" className="block text-sm font-medium mb-2">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="materialType"
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value as 'link' | 'pdf' | 'doc' | 'image' | 'video')}
                  className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                  required
                >
                  <option value="link">Link</option>
                  <option value="pdf">PDF</option>
                  <option value="doc">Document</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div>
                <label htmlFor="materialName" className="block text-sm font-medium mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="materialName"
                  type="text"
                  value={materialName}
                  onChange={(e) => setMaterialName(e.target.value)}
                  placeholder="e.g., Chapter 1 Notes"
                  className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="materialUrl" className="block text-sm font-medium mb-2">
                  URL / Path <span className="text-red-500">*</span>
                </label>
                <input
                  id="materialUrl"
                  type="text"
                  value={materialUrl}
                  onChange={(e) => setMaterialUrl(e.target.value)}
                  placeholder="https://example.com/file.pdf"
                  className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="materialSize" className="block text-sm font-medium mb-2">
                  Size
                </label>
                <input
                  id="materialSize"
                  type="text"
                  value={materialSize}
                  onChange={(e) => setMaterialSize(e.target.value)}
                  placeholder="e.g., 2.3 MB, 45 min"
                  className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowMaterialModal(false);
                    setMaterialName('');
                    setMaterialUrl('');
                    setMaterialSize('');
                    setMaterialType('link');
                  }}
                  className="flex-1 px-6 py-3 border border-black/20 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/80 transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowNoteModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl z-10">
            <h3 className="text-2xl font-bold mb-6 text-center">Add Note</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: submit to API
                setShowNoteModal(false);
                setNoteTitle('');
                setNoteContent('');
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="noteTitle" className="block text-sm font-medium mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="noteTitle"
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="e.g., Key Formulas"
                  className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="noteContent" className="block text-sm font-medium mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="noteContent"
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Write your notes here..."
                  rows={8}
                  className="w-full px-4 py-3 border border-black/20 rounded-lg text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowNoteModal(false);
                    setNoteTitle('');
                    setNoteContent('');
                  }}
                  className="flex-1 px-6 py-3 border border-black/20 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/80 transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
