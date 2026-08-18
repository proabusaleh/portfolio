import { LANGUAGE_LEVELS } from '../../../data/resumeData';

export default function ClassicTemplate({ resume }) {
  const { personal, experience, education, certifications, languages, hobbies, skills } = resume;

  const levelLabel = (lv) => LANGUAGE_LEVELS.find((l) => l.value === lv)?.label || '';

  const fmt = (d) => {
    if (!d) return '';
    const [y, m] = d.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[Number(m) - 1]} ${y}`;
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", width: '210mm', minHeight: '297mm', background: '#fff', color: '#1f2937', fontSize: '11pt', lineHeight: '1.5', margin: '0 auto' }}>

      {/* ─── HEADER ─── */}
      <div style={{
        background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #312e81 100%)',
        color: '#fff', padding: '32px 36px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative blur orbs */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'rgba(99,102,241,0.15)', borderRadius: '50%', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, background: 'rgba(139,92,246,0.12)', borderRadius: '50%', filter: 'blur(60px)' }} />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 24 }}>
          {personal.avatar && (
            <img src={personal.avatar} alt="" style={{ width: 72, height: 72, borderRadius: 16, objectFit: 'cover', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }} />
          )}
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>{personal.name}</h1>
            <p style={{ color: '#a5b4fc', fontWeight: 500, fontSize: 13, marginTop: 2 }}>{personal.title}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12, fontSize: '10.5px', color: '#d1d5db' }}>
              {personal.email && <ContactBadge text={personal.email} type="email" />}
              {personal.phone && <ContactBadge text={personal.phone} type="phone" />}
              {personal.location && <ContactBadge text={personal.location} type="location" />}
              {personal.website && <ContactBadge text={personal.website} type="web" />}
            </div>
          </div>
        </div>
      </div>

      {/* ─── BODY ─── */}
      <div style={{ padding: '28px 36px' }}>

        {/* Summary */}
        {personal.summary && (
          <Section icon="summary" label="Professional Summary">
            <p style={{ fontSize: '10.5px', color: '#4b5563', marginTop: 6, lineHeight: 1.6 }}>{personal.summary}</p>
          </Section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <Section icon="experience" label="Work Experience">
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{exp.role}</h3>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#6366f1', marginTop: 2 }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                  </div>
                  <span style={{ fontSize: '9.5px', fontWeight: 500, color: '#9ca3af', background: '#f9fafb', padding: '3px 8px', borderRadius: 5, whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {fmt(exp.startDate)} — {exp.current ? 'Present' : fmt(exp.endDate)}
                  </span>
                </div>
                {exp.description && <p style={{ fontSize: '10.5px', color: '#4b5563', marginTop: 6, lineHeight: 1.6 }}>{exp.description}</p>}
                {exp.highlights?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                    {exp.highlights.map((h) => (
                      <span key={h} style={{ fontSize: '8.5px', fontWeight: 600, padding: '3px 10px', borderRadius: 9999, background: '#eef2ff', color: '#4338ca', border: '1px solid #c7d2fe' }}>{h}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <Section icon="education" label="Education">
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{edu.degree}</h3>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#6366f1', marginTop: 2 }}>{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</p>
                  </div>
                  <span style={{ fontSize: '9.5px', fontWeight: 500, color: '#9ca3af', background: '#f9fafb', padding: '3px 8px', borderRadius: 5, whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {fmt(edu.startDate)} — {fmt(edu.endDate)}
                  </span>
                </div>
                {edu.description && <p style={{ fontSize: '10.5px', color: '#4b5563', marginTop: 6, lineHeight: 1.6 }}>{edu.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <Section icon="certs" label="Certifications">
            {certifications.map((cert) => (
              <div key={cert.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#818cf8', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{cert.name}</span>
                  <span style={{ fontSize: '10.5px', color: '#6b7280', marginLeft: 6 }}>— {cert.issuer}</span>
                </div>
                <span style={{ fontSize: '9.5px', color: '#9ca3af', marginLeft: 'auto', flexShrink: 0 }}>{fmt(cert.date)}</span>
              </div>
            ))}
          </Section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <Section icon="skills" label="Skills">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {skills.map((skill) => (
                <span key={skill} style={{ fontSize: '8.5px', fontWeight: 600, padding: '3px 10px', borderRadius: 9999, background: '#111827', color: '#fff' }}>{skill}</span>
              ))}
            </div>
          </Section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <Section icon="languages" label="Languages">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>{lang.name}</span>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} style={{ width: 11, height: 11 }} viewBox="0 0 24 24" fill={i < lang.level ? '#fbbf24' : 'none'} stroke={i < lang.level ? '#fbbf24' : '#e5e7eb'} strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    ))}
                  </div>
                  <span style={{ fontSize: 9, color: '#9ca3af', fontWeight: 500 }}>{levelLabel(lang.level)}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Hobbies */}
        {hobbies.length > 0 && (
          <Section icon="hobbies" label="Hobbies & Interests">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {hobbies.map((hobby) => (
                <span key={hobby} style={{ fontSize: '8.5px', fontWeight: 600, padding: '3px 10px', borderRadius: 9999, background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' }}>{hobby}</span>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

/* ─── Internal Components (inline-styled) ─── */

const iconPaths = {
  summary: <><circle cx="12" cy="12" r="1" /><path d="m12 2 1.09 3.26L16.5 6.5l-3.41 1.24L12 11l-1.09-3.26L7.5 6.5l3.41-1.24z" /><path d="m18 12 1.09 3.26L22.5 16.5l-3.41 1.24L18 21l-1.09-3.26L13.5 16.5l3.41-1.24z" /><path d="m6 18 1.09 3.26L10.5 22.5l-3.41 1.24L6 27l-1.09-3.26L1.5 22.5l3.41-1.24z" /></>,
  experience: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></>,
  education: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
  certs: <><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></>,
  skills: <><circle cx="12" cy="12" r="1" /><path d="m12 2 1.09 3.26L16.5 6.5l-3.41 1.24L12 11l-1.09-3.26L7.5 6.5l3.41-1.24z" /></>,
  languages: <><path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" /></>,
  hobbies: <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" /></>,
};

function Section({ icon, label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid #6366f1' }}>
        <svg style={{ width: 14, height: 14, color: '#6366f1' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {iconPaths[icon]}
        </svg>
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#111827' }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function ContactBadge({ text, type }) {
  const iconPath = {
    email: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></>,
    location: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    web: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
  };

  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 18, height: 18, background: 'rgba(255,255,255,0.1)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg style={{ width: 11, height: 11 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {iconPath[type]}
        </svg>
      </span>
      {text}
    </span>
  );
}
