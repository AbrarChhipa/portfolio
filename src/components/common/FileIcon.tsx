import React from 'react';
import { 
  FileCode2, 
  FileText, 
  Braces
} from 'lucide-react';

interface FileIconProps {
  type: string;
  size?: number;
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ type, size = 15, className = '' }) => {
  switch (type.toLowerCase()) {
    case 'tsx':
    case 'jsx':
      return (
        <span className={`inline-flex items-center justify-center font-bold text-[10px] text-[#4fc1ff] ${className}`} style={{ width: size, height: size }}>
          ⚛
        </span>
      );
    case 'ts':
      return (
        <span className={`inline-flex items-center justify-center font-bold text-[9px] bg-[#3178c6] text-white rounded-[2px] leading-none px-0.5 ${className}`} style={{ width: size, height: size - 1 }}>
          TS
        </span>
      );
    case 'js':
      return (
        <span className={`inline-flex items-center justify-center font-bold text-[9px] bg-[#f7df1e] text-black rounded-[2px] leading-none px-0.5 ${className}`} style={{ width: size, height: size - 1 }}>
          JS
        </span>
      );
    case 'html':
      return (
        <span className={`inline-flex items-center justify-center font-bold text-[10px] text-[#e34c26] ${className}`} style={{ width: size, height: size }}>
          &lt;&gt;
        </span>
      );
    case 'css':
      return (
        <span className={`inline-flex items-center justify-center font-bold text-[11px] text-[#563d7c] ${className}`} style={{ width: size, height: size }}>
          #
        </span>
      );
    case 'json':
      return <Braces size={size} className={`text-[#dcdcaa] ${className}`} />;
    case 'md':
      return (
        <span className={`inline-flex items-center justify-center font-bold text-[10px] text-[#42b883] ${className}`} style={{ width: size, height: size }}>
          M↓
        </span>
      );
    case 'pdf':
      return <FileText size={size} className={`text-[#f44747] ${className}`} />;
    default:
      return <FileCode2 size={size} className={`text-[#cccccc] ${className}`} />;
  }
};
