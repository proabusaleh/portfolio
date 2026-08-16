import SideBlock from './SideBlock.jsx';
import { resumeData } from '../../data/resumeData.js';

export default function Sidebar() {
  const {
    personal,
    contact,
    technicalSkills,
    softSkills,
    languages,
    personalDetails,
    certifications,
    hobbies,
  } = resumeData;

  return (
    <aside className="sidebar">
      {/* Profile Photo */}
      <div className="photo-frame">
        <img src={personal.photo} alt={personal.name} />
      </div>

      {/* CONTACT */}
      <SideBlock icon="bx-phone" title="CONTACT">
        <ul className="side-list contact-list">
          {contact.map((c, i) => (
            <li key={i}>
              <i className={`bx ${c.icon}`} /> {c.text}
            </li>
          ))}
        </ul>
      </SideBlock>

      {/* SKILLS */}
      <SideBlock icon="bx-cog" title="SKILLS">
        <h4 className="sub-title">TECHNICAL SKILLS</h4>
        <ul className="side-list dashed">
          {technicalSkills.map((s, i) => <li key={i}>{s}</li>)}
        </ul>

        <h4 className="sub-title">SOFT SKILLS</h4>
        <ul className="side-list dashed">
          {softSkills.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </SideBlock>

      {/* LANGUAGES */}
      <SideBlock icon="bx-globe" title="LANGUAGES">
        <ul className="lang-list">
          {languages.map((l) => (
            <li key={l.name}>
              <span>{l.name}</span>
              <span className="dots">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i key={i} className={`dot ${i < l.level ? 'on' : ''}`} />
                ))}
              </span>
            </li>
          ))}
        </ul>
      </SideBlock>

      {/* PERSONAL DETAILS */}
      <SideBlock icon="bx-user" title="PERSONAL DETAILS">
        <table className="personal-table">
          <tbody>
            {personalDetails.map((p) => (
              <tr key={p.label}>
                <td>{p.label}</td>
                <td>: {p.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SideBlock>

      {/* CERTIFICATIONS */}
      <SideBlock icon="bxs-badge-check" title="CERTIFICATIONS">
        <ul className="side-list bullet">
          {certifications.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </SideBlock>

      {/* HOBBIES */}
      <SideBlock icon="bx-heart" title="HOBBIES">
        <div className="hobbies">
          {hobbies.map((h) => (
            <div className="hobby" key={h.label}>
              <i className={`bx ${h.icon}`} />
              <span>{h.label}</span>
            </div>
          ))}
        </div>
      </SideBlock>
    </aside>
  );
}
