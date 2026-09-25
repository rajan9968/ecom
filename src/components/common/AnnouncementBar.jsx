import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function AnnouncementBar() {
  const messages = [
    'FREE UK STANDARD DELIVERY OVER £60',
    'WE DONATE 20% OF ALL KIDS NIGHTWEAR PROFITS TO CHARITY',
    'GET 15% OFF YOUR FIRST ORDER WITH CODE: WELCOME15'
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      backgroundColor: '#EAAFA0',
      color: '#1F1F1F',
      height: '36px',
      fontSize: 'clamp(0.64rem, 2.2vw, 0.74rem)',
      fontWeight: '600',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 8px',
      userSelect: 'none',
      zIndex: 110,
      position: 'relative',
      width: '100%',
      overflow: 'hidden'
    }}>
      <button 
        onClick={() => setIndex((index - 1 + messages.length) % messages.length)}
        aria-label="Previous message"
        style={{ padding: '6px', opacity: 0.75, display: 'flex', alignItems: 'center' }}
      >
        <ChevronLeft size={14} />
      </button>

      <div style={{ 
        textAlign: 'center', 
        flex: 1, 
        padding: '0 6px', 
        whiteSpace: 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis' 
      }}>
        <span>{messages[index]}</span>
      </div>

      <button 
        onClick={() => setIndex((index + 1) % messages.length)}
        aria-label="Next message"
        style={{ padding: '6px', opacity: 0.75, display: 'flex', alignItems: 'center' }}
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
