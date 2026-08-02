'use client';

import {useEffect, useRef, useState, ReactNode} from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  className = '',
  once = true
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const getTransformStyle = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';

    switch (direction) {
      case 'up':
        return 'translate3d(0, 32px, 0)';
      case 'down':
        return 'translate3d(0, -32px, 0)';
      case 'left':
        return 'translate3d(32px, 0, 0)';
      case 'right':
        return 'translate3d(-32px, 0, 0)';
      case 'zoom':
        return 'translate3d(0, 0, 0) scale(0.94)';
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransformStyle(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isVisible ? 'auto' : 'opacity, transform'
      }}
      className={className}
    >
      {children}
    </div>
  );
}
