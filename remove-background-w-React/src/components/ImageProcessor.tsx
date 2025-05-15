import  Tooltip  from '../components/Tooltip';
import { useImageProcessor } from '../hooks/useImageProcessor';
import { useState, useEffect } from 'react';

const ImageProcessor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const { processImage } = useImageProcessor();

  useEffect(() => {
    // Ajustar el margen del botón de procesar dinámicamente
    const processBtn = document.querySelector('.processBtn') as HTMLElement;
    if (processBtn) {
      processBtn.style.marginTop = selectedFile ? '2.5rem' : '0';
    }
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setResultImage(null); // Resetear la imagen procesada al seleccionar un nuevo archivo

    // Actualizar dinámicamente el nombre del archivo seleccionado
    const fileNameDisplay = document.querySelector('.file-name') as HTMLElement;
    if (fileNameDisplay) {
      fileNameDisplay.innerHTML = file
        ? `<strong>Imagen seleccionada: </strong>${file.name}`
        : 'Ninguna imagen seleccionada';
    }
  };

  const handleProcessClick = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const processedImage = await processImage(selectedFile);
      setResultImage(processedImage);
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="setupBg">
      <div className="mainSelectFile">
        <div className="pTooltip">
          Selecciona una imagen
        <Tooltip/>
        </div>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
        />
        <label id="labelFile" htmlFor="file">
          Subir imagen
          <p className="file-name"></p>
        </label>
      </div>

      <div className="mainBtnProcess">
      <button
          className="processBtn"
          id="processBtn"
          onClick={handleProcessClick}
          disabled={!selectedFile || isProcessing}
        >
          {isProcessing ? 'Procesando...' : 'Procesar'}
        </button>
      </div>

      <div className="mainBtnDownload">
        <button
            className="downloadBtn"
            id="downloadBtn"
            disabled={!resultImage}
          >
          Descargar
        </button>
      </div>
    </div>
  );
};

export default ImageProcessor;