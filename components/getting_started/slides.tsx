'use client';

import { useState, useEffect } from 'react';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&fm=jpg&q=80',
    title: 'Plan Your Studies',
    subtitle: 'Organize your academic life with smart scheduling',
  },
  {
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&fm=jpg&q=80',
    title: 'Stay Focused',
    subtitle: 'Track tasks and never miss a deadline',
  },
  {
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&fm=jpg&q=80',
    title: 'Study Smarter',
    subtitle: 'Build better habits and achieve your goals',
  },
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&fm=jpg&q=80',
    title: 'Achieve More',
    subtitle: 'Your path to academic success starts here',
  },
];

export default function Slides() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-8">
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-xl text-gray-200 max-w-lg">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
