import { useEffect, useState } from 'react';

export default function Loader() {
  const [percent, setPercent] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.classList.add('loading');
    const interval = setInterval(() => {
      setPercent((p) => Math.min(p + Math.random() * 15 + 5, 95));
    }, 200);

    const finish = () => {
      clearInterval(interval);
      setPercent(100);
      setTimeout(() => setHidden(true), 500);
      setTimeout(() => {
        setGone(true);
        document.body.classList.remove('loading');
      }, 1200);
    };

    const onLoad = () => setTimeout(finish, 500);
    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }
    const fallback = setTimeout(finish, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(fallback);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  if (gone) return null;

  return (
    <div id="loader" className={`loader-wrapper ${hidden ? 'hidden' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          <span className="logo-bracket">{'{'}</span>
          <span className="logo-text">Abu Saleh</span>
          <span className="logo-bracket">{'}'}</span>
        </div>
        <div className="loader-bar">
          <div className="loader-progress" style={{ width: `${percent}%` }} />
        </div>
        <div className="loader-percent">{Math.round(percent)}%</div>
      </div>
      <div className="loader-particles" id="loaderParticles" />
    </div>
  );
}
