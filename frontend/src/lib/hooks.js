import { useEffect, useRef, useState, useCallback } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}

export function useTypewriter(words, { typeSpeed = 75, deleteSpeed = 45, pauseTime = 2200 } = {}) {
  const [text, setText] = useState('');
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = words[wordIndex];
      if (!deleting) {
        charIndex++;
        setText(word.slice(0, charIndex));
        setBlinking(charIndex === word.length);
        if (charIndex === word.length) {
          deleting = true;
          timer = setTimeout(tick, pauseTime);
          return;
        }
        timer = setTimeout(tick, typeSpeed);
      } else {
        charIndex--;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timer = setTimeout(tick, 400);
          return;
        }
        timer = setTimeout(tick, deleteSpeed);
      }
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [words, typeSpeed, deleteSpeed, pauseTime]);

  return { text, blinking };
}

export function useReveal(dep) {
  useEffect(() => {
    let observer;
    let mutationObserver;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const observeEl = (el) => {
      el.classList.add('aos-init');
      observer.observe(el);
    };

    document.querySelectorAll('[data-aos]').forEach(observeEl);

    mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches && node.matches('[data-aos]')) observeEl(node);
          if (node.querySelectorAll) node.querySelectorAll('[data-aos]').forEach(observeEl);
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [dep]);
}

export function useCounter(target, { duration = 1800, start = false } = {}) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const step = (now) => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return { value, ref };
}

export function useCountersOnView() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export function useScrollState() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setShowTop(y > 500);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min((y / total) * 100, 100) : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrolled, progress, showTop };
}
