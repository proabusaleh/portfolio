export default function MainBlock({ icon, title, optional, children }) {
  return (
    <section className="main-block">
      <h2 className="main-title">
        <i className={`bx ${icon}`} /> {title}
        {optional && <span className="optional">(optional)</span>}
      </h2>
      {children}
    </section>
  );
}
