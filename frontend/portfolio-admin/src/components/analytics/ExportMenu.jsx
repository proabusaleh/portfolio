import { Download, FileText, FileSpreadsheet, Printer } from 'lucide-react';
import { toast } from 'sonner';
import Dropdown from '../ui/Dropdown';
import { exportToCSV } from '../../api/analyticsApi';

export default function ExportMenu({ analytics }) {
  const handleCSV = () => {
    exportToCSV(analytics);
    toast.success('CSV downloaded ✓');
  };

  const handlePDF = () => {
    toast.success('Opening print dialog — save as PDF');
    setTimeout(() => window.print(), 300);
  };

  const handlePrint = () => window.print();

  return (
    <Dropdown
      align="right"
      width="w-48"
      trigger={
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-primary text-white text-sm font-medium hover:opacity-90 shadow-md shadow-indigo-500/20 transition">
          <Download className="w-4 h-4" />
          Export
        </button>
      }
    >
      <div className="p-1">
        <MenuItem icon={FileSpreadsheet} label="Export as CSV" onClick={handleCSV} />
        <MenuItem icon={FileText}        label="Export as PDF" onClick={handlePDF} />
        <MenuItem icon={Printer}         label="Print report"  onClick={handlePrint} />
      </div>
    </Dropdown>
  );
}

function MenuItem({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-left transition"
    >
      <Icon className="w-4 h-4 text-gray-500" />
      {label}
    </button>
  );
}