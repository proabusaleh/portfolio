import { useState } from 'react';
import { X, Download, Printer, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResumeStore } from '../../../store/resumeStore';
import { exportResumePDF } from '../../../api/resumeApi';
import { toast } from 'sonner';
import Button from '../../ui/Button';
import ClassicTemplate from './ClassicTemplate';

export default function CVPreviewModal({ isOpen, onClose }) {
  const resume = useResumeStore((s) => s.resume);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportResumePDF();
      toast.success('PDF export simulated successfully');
    } catch {
      toast.error('Export failed');
    } finally {
      setExporting(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const content = document.getElementById('cv-print-area');
    printWindow.document.write(`<!DOCTYPE html>
<html><head><title>CV - ${resume.personal.name}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact; background: #fff; }
  @media print { body { background: #fff; } }
</style>
</head><body>
${content.innerHTML}
</body></html>`);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl max-h-[92vh] pointer-events-auto flex flex-col rounded-2xl bg-white dark:bg-gray-900 shadow-2xl shadow-black/20 border border-gray-200/50 dark:border-gray-800/50 overflow-hidden"
            >
              {/* Header */}
              <div className="relative flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 no-print bg-gradient-to-r from-white via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-gray-900 dark:text-gray-100">CV Preview</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{resume.personal.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={handlePrint} className="gap-1.5">
                    <Printer className="w-4 h-4" /> Print
                  </Button>
                  <Button size="sm" variant="primary" onClick={handleExport} loading={exporting} className="gap-1.5">
                    <Download className="w-4 h-4" /> Export PDF
                  </Button>
                  <button
                    onClick={onClose}
                    className="ml-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Preview area */}
              <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6 sm:p-8 no-print">
                <div id="cv-print-area" className="mx-auto max-w-[210mm]">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="shadow-2xl shadow-black/10 rounded-lg overflow-hidden ring-1 ring-gray-200/50 dark:ring-gray-800/50"
                  >
                    <ClassicTemplate resume={resume} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
