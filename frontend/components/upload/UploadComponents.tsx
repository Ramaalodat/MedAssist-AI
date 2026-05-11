import React from 'react';
import { Upload, File, X } from 'lucide-react';

export const UploadDropzone: React.FC = () => {
  return (
    <div className="w-full h-64 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer group">
      <div className="w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
        <Upload className="w-8 h-8 text-blue-500" />
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-white">اسحب الملفات هنا أو اضغط للرفع</p>
        <p className="text-sm text-gray-500">يدعم ملفات DICOM, JPG, PNG (بحد أقصى 50 ميجابايت)</p>
      </div>
    </div>
  );
};

export const UploadPreview: React.FC<{ file: File; onRemove: () => void }> = ({ file, onRemove }) => {
  return (
    <div className="glass-card p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
          <File className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{file.name}</p>
          <p className="text-[10px] text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      </div>
      <button onClick={onRemove} className="p-1.5 hover:bg-red-500/10 text-gray-500 hover:text-red-500 rounded-lg transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
