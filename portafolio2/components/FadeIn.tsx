import React, { useState, useRef, useEffect } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, className = '', delay = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        if (domRef.current) {
            observer.unobserve(domRef.current);
        }
      }
    });

    const { current } = domRef;
    if (current) {
        observer.observe(current);
    }

    return () => {
        if (current) {
            observer.unobserve(current);
        }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} transition-all duration-1000 ${delay} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

export default FadeIn;
