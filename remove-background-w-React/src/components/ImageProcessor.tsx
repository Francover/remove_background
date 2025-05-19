import Tooltip from '../components/Tooltip';
import { useImageProcessor } from '../hooks/useImageProcessor';
import type { ImageProcessorProps } from '../types/ImageProcessorProps';
import { useEffect } from 'react';

const ImageProcessor: React.FC<ImageProcessorProps> = ({
  selectedFile,
  setSelectedFile,
  setResultImage,
  isProcessing,
  setIsProcessing,
  resultImage
}) => {
  const { processImage } = useImageProcessor();

  useEffect(() => {
    const processBtn = document.querySelector('.processBtn') as HTMLElement;

    if (processBtn) {
      processBtn.style.marginTop = selectedFile ? '2.5rem' : '0';
    }
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    const fileNameDisplay = document.querySelector('.file-name') as HTMLElement;
    if (fileNameDisplay) {
      fileNameDisplay.innerHTML = file
        ? `<strong>Imagen seleccionada: </strong>${file.name}`
        : 'Ninguna imagen seleccionada';
    }
  };

  function applyGradientToImage(base64: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = img.width;
        canvas.height = img.height;

        // Gradiente
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, "#22CCBF");
        gradient.addColorStop(1, "#2A70C4");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Imagen procesada encima
        ctx.drawImage(img, 0, 0);

        resolve(canvas.toDataURL('image/png'));
      };
      img.src = base64;
    });
  }


  const handleProcessClick = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const processedImage = await processImage(selectedFile);
      if (processedImage) {
        const imageWithBg = await applyGradientToImage(processedImage);
        setResultImage(imageWithBg);
      }
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
          <Tooltip />
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
        {resultImage ? (
          <a
            className="downloadBtn"
            id="downloadBtn"
            href={resultImage}
            download="foto-attach.png"
          >
            Descargar
          </a>
        ) : (
          <button className="downloadBtn" id="downloadBtn" disabled>
            Descargar
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageProcessor;