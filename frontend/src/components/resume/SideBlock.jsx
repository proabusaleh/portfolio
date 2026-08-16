export default function SideBlock({ icon, title, children }) {
  return (
    <div className="side-block">
      <h3 className="side-title">
        <i className={`bx ${icon}`} /> {title}
      </h3>
      {children}
    </div>
  );
}
