import { useEffect, useRef } from 'react';

export const useScrollAnim = (optionsInput = { threshold: 0, rootMargin: '0px 0px -50px 0px' }) => {
  const ref = useRef(null);
  const optionsStr = JSON.stringify(optionsInput);

  useEffect(() => {
    const options = JSON.parse(optionsStr);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [optionsStr]);

  return ref;
};

// Use this for mapping multiple children inside a parent staggered
export const useStaggeredScrollAnim = (optionsInput = { threshold: 0, rootMargin: '0px 0px -50px 0px' }) => {
  const containerRef = useRef(null);
  const optionsStr = JSON.stringify(optionsInput);

  useEffect(() => {
    const options = JSON.parse(optionsStr);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (containerRef.current) {
      const reveals = containerRef.current.querySelectorAll('.reveal-up, .reveal-fade');
      reveals.forEach(el => observer.observe(el));
    }

    return () => {
      if (containerRef.current) {
        const reveals = containerRef.current.querySelectorAll('.reveal-up, .reveal-fade');
        reveals.forEach(el => observer.unobserve(el));
      }
    };
  }, [optionsStr]);

  return containerRef;
};
