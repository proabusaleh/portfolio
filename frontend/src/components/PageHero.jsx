import { Link } from 'react-router-dom';

export default function PageHero({ title, crumb, subtitle }) {
  return (
    <section className="breadcrumb-section">
      <div className="container">
        <div className="breadcrumb-content">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <i className="bx bx-chevron-right" />
            <span className="active">{crumb || title}</span>
          </div>
          <h1 className="breadcrumb-title">{title}</h1>
          {subtitle && <p className="breadcrumb-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="breadcrumb-shapes">
        <div className="shape-circle shape-1" />
        <div className="shape-circle shape-2" />
      </div>
    </section>
  );
}
