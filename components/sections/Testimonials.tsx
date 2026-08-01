'use client';

import {useTranslations} from 'next-intl';
import {useState, useEffect, useRef, useCallback} from 'react';
import {ChevronLeft, ChevronRight, Quote} from 'lucide-react';
import Section from '@/components/ui/Section';
import ScrollReveal from '@/components/ui/ScrollReveal';

// Avatar initials color palette
const AVATAR_COLORS = [
  'bg-[var(--accent)] text-[var(--bg-primary)]',
  'bg-violet-500 text-white',
  'bg-sky-500 text-white',
  'bg-emerald-500 text-white',
  'bg-amber-500 text-white',
  'bg-rose-500 text-white',
];

export default function Testimonials() {
  const t = useTranslations('testimonials');

  // Dynamically read all items from the i18n JSON.
  // Works with any number of items — just add "5", "6", ... to the JSON.
  const rawItems = (t.raw('items') as Record<string, {quote: string; author: string; role: string}>);
  const items = Object.keys(rawItems).sort((a, b) => Number(a) - Number(b));
  const total = items.length;

  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((index + total) % total);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play: pause on user interaction, resume after 4s idle
  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    autoPlayRef.current = setTimeout(() => {
      setCurrent((c) => (c + 1) % total);
    }, 4500);
  }, [total]);

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [current, resetAutoPlay]);

  // Touch / Mouse drag support
  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);
    const threshold = 60;
    if (dragOffset < -threshold) {
      next();
    } else if (dragOffset > threshold) {
      prev();
    }
    setDragOffset(0);
    resetAutoPlay();
  };

  const translateX = -(current * 100) + (dragging ? (dragOffset / (trackRef.current?.offsetWidth || 1)) * 100 : 0);

  return (
    <Section id="testimonials">
      <ScrollReveal direction="up" delay={0}>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">
            {t('title')}
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">{t('subtitle')}</p>
        </div>
      </ScrollReveal>

      <div className="mx-auto max-w-3xl">

        {/* Carousel Track — slides up when entering viewport */}
        <ScrollReveal direction="up" delay={100} duration={700}>
          <div
            ref={trackRef}
            className="relative overflow-hidden rounded-3xl select-none touch-pan-y"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{cursor: dragging ? 'grabbing' : 'grab'}}
          >
            {/* Slides */}
            <div
              className="flex"
              style={{
                transform: `translateX(${translateX}%)`,
                transition: dragging ? 'none' : 'transform 480ms cubic-bezier(0.25, 1, 0.5, 1)',
                willChange: 'transform',
              }}
            >
              {items.map((key, index) => {
                const item = rawItems[key];
                if (!item) return null;
                const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length];

                return (
                  <div
                    key={key}
                    className="min-w-full px-1"
                    aria-hidden={index !== current}
                  >
                    <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-8 shadow-lg sm:p-10">
                      {/* Quote icon */}
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--accent)]">
                        <Quote size={22} />
                      </div>

                      {/* Stars */}
                      <div className="mb-4 flex gap-1">
                        {Array.from({length: 5}).map((_, i) => (
                          <svg key={i} className="h-5 w-5 fill-[var(--accent)] text-[var(--accent)]" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Quote text */}
                      <blockquote className="text-base leading-relaxed text-[var(--text-primary)] sm:text-lg">
                        "{item.quote}"
                      </blockquote>

                      {/* Author */}
                      <div className="mt-7 flex items-center gap-4 border-t border-[var(--border-default)] pt-5">
                        <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${colorClass}`}>
                          {item.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-[var(--text-primary)]">
                            {item.author}
                          </div>
                          <div className="text-sm text-[var(--text-muted)]">
                            {item.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Controls + counter — fade in slightly after the card */}
        <ScrollReveal direction="up" delay={250} duration={600}>
          {/* Controls: prev / dots / next */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Prev button */}
            <button
              onClick={() => { prev(); resetAutoPlay(); }}
              className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { goTo(index); resetAutoPlay(); }}
                  className={`cursor-pointer h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? 'w-6 bg-[var(--accent)]'
                      : 'w-2 bg-[var(--border-hover)] hover:bg-[var(--text-muted)]'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={() => { next(); resetAutoPlay(); }}
              className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Counter */}
          <p className="mt-4 text-center text-sm text-[var(--text-muted)]">
            {current + 1} / {total}
          </p>
        </ScrollReveal>

      </div>
    </Section>
  );
}
