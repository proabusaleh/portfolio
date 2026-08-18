import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

export default function LogoUploader({ label, value, onChange, aspect = 'square', hint }) {
  const onDrop = useCallback((files) => {
    if (!files?.length) return;
    const file = files[0];
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Max file size is 2MB');
      return;
    }
    const url = URL.createObjectURL(file);
    onChange(url);
    toast.success('Uploaded ✓');
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.svg', '.webp'] },
    multiple: false,
  });

  const clear = (e) => {
    e.stopPropagation();
    onChange('');
    toast.success('Removed');
  };

  const aspectClass = aspect === 'square' ? 'aspect-square w-24 h-24' : 'aspect-[3/1] w-40 h-16';

  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1.5">{label}</label>}

      <div className="flex items-center gap-3">
        {/* Preview */}
        {value ? (
          <div className={cn('relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shrink-0', aspectClass)}>
            <img src={value} alt={label} className="w-full h-full object-contain p-1" />
            <button
              type="button"
              onClick={clear}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className={cn('rounded-lg border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-900 shrink-0', aspectClass)}>
            <ImageIcon className="w-6 h-6" />
          </div>
        )}

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={cn(
            'flex-1 border-2 border-dashed rounded-lg p-4 cursor-pointer text-center transition',
            isDragActive
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30'
              : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
          )}
        >
          <input {...getInputProps()} />
          <Upload className="w-5 h-5 mx-auto text-gray-400 mb-1" />
          <p className="text-xs font-medium">
            {isDragActive ? 'Drop here...' : 'Click or drag to upload'}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">PNG, JPG, SVG · max 2MB</p>
        </div>
      </div>

      {hint && <p className="text-xs text-gray-500 mt-1.5">{hint}</p>}
    </div>
  );
}