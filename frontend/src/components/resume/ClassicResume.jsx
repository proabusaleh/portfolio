import Sidebar from './Sidebar.jsx';
import MainContent from './MainContent.jsx';
import '../../styles/resume-classic.css';

export default function ClassicResume() {
  return (
    <div className="resume-classic">
      {/* Download button */}
      <div className="download-bar">
        <button onClick={() => window.print()} className="download-btn">
          <i className="bx bx-download" /> Download PDF
        </button>
      </div>

      <div className="cv">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}
