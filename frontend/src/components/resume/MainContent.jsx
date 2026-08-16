import MainBlock from './MainBlock.jsx';
import { resumeData } from '../../data/resumeData.js';

export default function MainContent() {
  const {
    personal,
    objective,
    experience,
    education,
    achievements,
    training,
    references,
  } = resumeData;

  return (
    <main className="main">
      {/* Name + Title */}
      <header className="name-header">
        <h1>{personal.name}</h1>
        <p className="job-title">{personal.title}</p>
      </header>

      {/* CAREER OBJECTIVE */}
      <MainBlock icon="bxs-user-detail" title="CAREER OBJECTIVE">
        <p className="objective">{objective}</p>
      </MainBlock>

      {/* PROFESSIONAL EXPERIENCE */}
      <MainBlock icon="bxs-briefcase" title="PROFESSIONAL EXPERIENCE">
        {experience.map((job, i) => (
          <div className="exp-item" key={i}>
            <div className="exp-head">
              <div>
                <strong>{job.role}</strong>
                <div className="company">{job.company}</div>
              </div>
              <div className="date">{job.date}</div>
            </div>
            <ul className="exp-list">
              {job.points.map((p, idx) => <li key={idx}>{p}</li>)}
            </ul>
          </div>
        ))}
      </MainBlock>

      {/* EDUCATION */}
      <MainBlock icon="bxs-graduation" title="EDUCATIONAL QUALIFICATIONS">
        <table className="edu-table">
          <thead>
            <tr>
              <th>EXAMINATION</th>
              <th>INSTITUTION</th>
              <th>BOARD / UNIVERSITY</th>
              <th>YEAR</th>
              <th>RESULT</th>
            </tr>
          </thead>
          <tbody>
            {education.map((e, i) => (
              <tr key={i}>
                <td>{e.exam}</td>
                <td>{e.inst}</td>
                <td>{e.board}</td>
                <td>{e.year}</td>
                <td>
                  {e.result}
                  <br />
                  <span className="small">{e.out}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </MainBlock>

      {/* KEY ACHIEVEMENTS */}
      <MainBlock icon="bxs-trophy" title="KEY ACHIEVEMENTS">
        <ul className="exp-list">
          {achievements.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </MainBlock>

      {/* TRAINING */}
      <MainBlock icon="bxs-book-content" title="TRAINING & WORKSHOPS">
        <ul className="exp-list">
          {training.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </MainBlock>

      {/* REFERENCES */}
      <MainBlock icon="bxs-user-voice" title="REFERENCES" optional>
        <div className="references">
          {references.map((r, i) => (
            <div className="ref" key={i}>
              <strong>{r.name}</strong>
              <span>{r.role}</span>
              <span>{r.company}</span>
              <span><i className="bx bxs-phone" /> {r.phone}</span>
              <span><i className="bx bxs-envelope" /> {r.email}</span>
            </div>
          ))}
        </div>
      </MainBlock>
    </main>
  );
}
