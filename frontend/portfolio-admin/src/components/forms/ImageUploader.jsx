import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, GripVertical, Loader2 } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';
import { uploadFile } from '../../api/mediaApi';

export default function ImageUploader({
  label = 'Images',
  value = [],
  onChange,
  multiple = true,
  maxFiles = 10,
  hint,
  error,
}) {
  const [images, setImages] = useState(
    value.map((url, i) => ({ id: `${Date.now()}-${i}`, url, name: `image-${i + 1}` }))
  );
  const [uploading, setUploading] = useState(false);

  const updateImages = (newImages) => {
    setImages(newImages);
    onChange(newImages.map((i) => i.url));
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (images.length + acceptedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} images allowed`);
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const result = await uploadFile(file, 'blog');
        return {
          id: `${Date.now()}-${Math.random()}`,
          url: result.url,
          name: file.name,
        };
      });

      const uploaded = await Promise.all(uploadPromises);
      updateImages(multiple ? [...images, ...uploaded] : uploaded);
      toast.success(`${uploaded.length} image(s) uploaded`);
    } catch {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
    // eslint-disable-next-line
  }, [images, multiple, maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'] },
    multiple,
    maxSize: 5 * 1024 * 1024,
    disabled: uploading,
  });

  const removeImage = (id) => {
    updateImages(images.filter((img) => img.id !== id));
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">{label}</label>
          <span className="text-xs text-gray-400">{images.length} / {maxFiles}</span>
        </div>
      )}

      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 cursor-pointer transition text-center',
          isDragActive
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30'
            : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800/50',
          error && 'border-red-500',
          uploading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <Loader2 className="w-8 h-8 mx-auto text-indigo-500 mb-2 animate-spin" />
        ) : (
          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
        )}
        <p className="text-sm font-medium">
          {uploading ? 'Uploading...' : isDragActive ? 'Drop images here...' : 'Drag & drop images, or click to browse'}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          PNG, JPG, WEBP, GIF up to 5MB each
        </p>
      </div>

      {images.length > 0 && (
        <Reorder.Group
          axis="y"
          values={images}
          onReorder={updateImages}
          className="space-y-2"
        >
          {images.map((img, i) => (
            <Reorder.Item
              key={img.id}
              value={img}
              className="flex items-center gap-3 p-2 pr-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              <GripVertical className="w-4 h-4 text-gray-400 cursor-grab active:cursor-grabbing" />
              <img
                src={img.url}
                alt={img.name}
                className="w-14 h-14 rounded object-cover border border-gray-200 dark:border-gray-800"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{img.name}</p>
                <p className="text-xs text-gray-400">
                  {i === 0 && '★ Primary • '}Position {i + 1}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}

      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">⚠ {error}</p>}
    </div>
  );
}
