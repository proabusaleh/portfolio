import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileImage, Video, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const TYPE_ICONS = { image: FileImage, video: Video, document: FileText };

function getFileType(file) {
  if (file.type.startsWith('video')) return 'video';
  if (file.type.startsWith('image')) return 'image';
  return 'document';
}

export default function UploadZone({ onUpload, folderId }) {
  const [uploads, setUploads] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newUploads = acceptedFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: getFileType(file),
      progress: 0,
      status: 'pending',
    }));

    setUploads((prev) => [...prev, ...newUploads]);

    newUploads.forEach((upload) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30 + 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploads((prev) =>
            prev.map((u) => (u.id === upload.id ? { ...u, progress: 100, status: 'done' } : u))
          );
          onUpload({ ...upload.file, name: upload.name, folderId });
        } else {
          setUploads((prev) =>
            prev.map((u) => (u.id === upload.id ? { ...u, progress } : u))
          );
        }
      }, 200);
    });
  }, [onUpload, folderId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const _removeUpload = (id) => setUploads((prev) => prev.filter((u) => u.id !== id));

  const activeUploads = uploads.filter((u) => u.status !== 'done');
  const doneUploads = uploads.filter((u) => u.status === 'done');

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer',
          isDragActive
            ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-500/5'
            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
        )}
      >
        <input {...getInputProps()} />
        <Upload className={cn('w-8 h-8 mx-auto mb-2', isDragActive ? 'text-indigo-500' : 'text-gray-400')} />
        <p className="text-sm font-medium">{isDragActive ? 'Drop files here' : 'Drag & drop files or click to browse'}</p>
        <p className="text-xs text-gray-500 mt-1">Images, videos, and documents</p>
      </div>

      <AnimatePresence>
        {activeUploads.map((upload) => {
          const Icon = TYPE_ICONS[upload.type] || FileText;
          return (
            <motion.div
              key={upload.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800"
            >
              <Icon className="w-5 h-5 text-gray-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{upload.name}</p>
                <div className="mt-1.5 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${upload.progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              <span className="text-[10px] text-gray-400 shrink-0">{Math.round(upload.progress)}%</span>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {doneUploads.length > 0 && (
        <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-800">
          <p className="text-xs text-green-600 dark:text-green-400">{doneUploads.length} file{doneUploads.length > 1 ? 's' : ''} uploaded</p>
          <button onClick={() => setUploads([])} className="text-green-600 dark:text-green-400 hover:text-green-800">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
