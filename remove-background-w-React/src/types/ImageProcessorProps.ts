export interface ImageProcessorProps {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  setResultImage: (image: string | null) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  resultImage: string | null;
}