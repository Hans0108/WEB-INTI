import React, { useState, useRef } from 'react';
import { Upload, X, AlertTriangle, Check, FileImage } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onUpload: (dataUrl: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onUpload, label = "Upload Image (PNG/JPG)" }: ImageUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setError(null);
    setIsSuccess(false);

    // Validate type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a PNG, JPG or JPEG image.');
      return;
    }

    // Limit size to ~5MB to prevent huge localStorage payloads
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File is too large. Max size allowed is 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        onUpload(result);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        setError('Failed to read image file.');
      }
    };
    reader.onerror = () => {
      setError('An error occurred while reading the file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpload('');
  };

  return (
    <div className="space-y-2 font-mono text-xs">
      <div className="flex justify-between items-center">
        <label className="block text-gray-500 uppercase tracking-wider font-bold">{label}</label>
        {value && (
          <button
            type="button"
            onClick={clearImage}
            className="text-[10px] text-rose-500 font-bold uppercase tracking-wider hover:underline flex items-center gap-1 cursor-pointer"
          >
            <X size={12} /> Clear Upload
          </button>
        )}
      </div>

      <div
        id="image-dropzone"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 relative group flex flex-col items-center justify-center min-h-[140px] ${
          isDragActive
            ? 'border-imperial-red bg-imperial-red/5'
            : value
            ? 'border-luxury-gold/50 bg-[#FAFAFA]'
            : 'border-luxury-gold/30 hover:border-imperial-red/50 bg-white hover:bg-[#FAFAFA]'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept=".png,.jpg,.jpeg"
          className="hidden"
        />

        {value ? (
          <div className="relative w-full max-w-[200px] h-24 overflow-hidden rounded border border-luxury-gold/20 shadow-sm">
            <img src={value} alt="Preview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="text-[10px] text-white font-bold bg-[#1a1a1a]/80 px-2 py-1 uppercase tracking-wider rounded">Replace File</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold-dark group-hover:text-imperial-red group-hover:bg-imperial-red/10 transition-colors duration-300">
              <Upload size={18} />
            </div>
            <div>
              <p className="font-bold text-[#1a1a1a] uppercase tracking-wide text-[11px]">
                Drag & Drop PNG/JPG here
              </p>
              <p className="text-gray-400 text-[10px] uppercase mt-1">
                or click to browse local files
              </p>
            </div>
          </div>
        )}

        {isSuccess && (
          <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] text-emerald-600 bg-emerald-50 border border-emerald-500/20 px-1.5 py-0.5 font-bold uppercase tracking-wider">
            <Check size={10} /> Loaded
          </div>
        )}
      </div>

      {error && (
        <div className="p-2.5 bg-rose-50 border border-rose-500/20 text-rose-700 rounded text-[10px] flex items-center gap-2 font-bold uppercase tracking-wider">
          <AlertTriangle size={12} className="shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
