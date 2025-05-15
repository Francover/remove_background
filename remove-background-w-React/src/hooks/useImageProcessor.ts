import { useState } from 'react';

const MODE = 'demo';
const RAPIDAPI_KEY = '';

const OPTIONS = {
  demo: {
    url: 'https://demo.api4ai.cloud/img-bg-removal/v1/results',
    headers: { 'A4A-CLIENT-APP-ID': 'sample' },
  },
  rapidapi: {
    url: 'https://background-removal4.p.rapidapi.com/v1/results',
    headers: { 'X-RapidAPI-Key': RAPIDAPI_KEY },
  },
};

export const useImageProcessor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const processImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const form = new FormData();
      form.append('image', selectedFile);

      const response = await fetch(OPTIONS[MODE].url, {
        method: 'POST',
        body: form,
        headers: OPTIONS[MODE].headers,
      });

      const data = await response.json();
      const imgBase64 = data.results[0].entities[0].image;
      setResultImage(`data:image/png;base64,${imgBase64}`);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    selectedFile,
    resultImage,
    isProcessing,
    handleFileChange,
    processImage,
  };
};