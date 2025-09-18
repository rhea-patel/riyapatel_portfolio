import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  typingSpeed?: number; // ms per character
  erasingSpeed?: number; // ms per character
  pauseTime?: number; // ms to wait after typing before erasing
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  typingSpeed = 40,
  erasingSpeed = 30,
  pauseTime = 2000,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    let interval: ReturnType<typeof setTimeout>;

    if (isTyping) {
      interval = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index === text.length) {
          clearInterval(interval);
          setTimeout(() => setIsTyping(false), pauseTime);
        }
      }, typingSpeed);
    } else {
      index = text.length;
      interval = setInterval(() => {
        setDisplayedText(text.slice(0, index - 1));
        index--;
        if (index === 0) {
          clearInterval(interval);
          setTimeout(() => setIsTyping(true), 500); // short pause before typing again
        }
      }, erasingSpeed);
    }

    return () => clearInterval(interval);
  }, [isTyping, text, typingSpeed, erasingSpeed, pauseTime]);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
      {displayedText}
      <span style={{ visibility: showCursor ? 'visible' : 'hidden' }}>|</span>
    </span>
  );
};

export default Typewriter;
