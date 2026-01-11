'use client';

import { useEffect, useState } from 'react';

const messages = [
  'Fetching your transactions...',
  'Analyzing performance...',
  'Detecting behavior patterns...',
];

export default function AnalysisLoading() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < messages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-3">
        {messages.slice(0, currentMessageIndex + 1).map((message, index) => (
          <p
            key={index}
            className={`text-sm text-text-secondary transition-opacity duration-500 ${
              index === currentMessageIndex ? 'opacity-100 text-text-primary' : 'opacity-50'
            }`}
          >
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}

