export default function SectionHeader({ tag, title, subtitle, align = 'center' }) {
  return (
    <div className="section-header" data-aos="fade-up" style={align === 'left' ? { textAlign: 'left' } : undefined}>
      {tag && <span className="section-tag">{tag}</span>}
      <h2 className="section-title" style={align === 'left' ? { textAlign: 'left' } : undefined}>
        {title}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
