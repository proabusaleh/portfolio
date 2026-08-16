import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline || window.innerWidth <= 768) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.opacity = '1';
      outline.style.opacity = '1';
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      const ease = 0.12;
      outlineX += (mouseX - outlineX) * ease;
      outlineY += (mouseY - outlineY) * ease;
      outline.style.left = `${outlineX}px`;
      outline.style.top = `${outlineY}px`;
      raf = requestAnimationFrame(animate);
    };

    const onLeave = () => {
      dot.style.opacity = '0';
      outline.style.opacity = '0';
    };

    const onHoverIn = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
      outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
      outline.style.borderColor = 'var(--accent)';
    };

    const onHoverOut = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      outline.style.transform = 'translate(-50%, -50%) scale(1)';
      outline.style.borderColor = 'rgba(124, 58, 237, 0.5)';
    };

    const onDown = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(0.7)';
      outline.style.transform = 'translate(-50%, -50%) scale(0.8)';
    };

    const onUp = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      outline.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.querySelectorAll('a, button, .service-card, .project-card').forEach((el) => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" id="cursorDot" ref={dotRef} />
      <div className="cursor-outline" id="cursorOutline" ref={outlineRef} />
    </>
  );
}
