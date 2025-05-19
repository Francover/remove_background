import { useState } from 'react';
import ImageProcessor from './components/ImageProcessor';
import SectionParsed from './components/SectionParsed'; // Nuevo componente

const App = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);


  return (
    <>
      <header>
        <div>
          <img src="/src/img/logo-white.svg" alt="Logo de ATTACH" />
        </div>
      </header>

      <main>
        <h1>Actualiza tu foto profesional</h1>
        <p>
          Selecciona una imagen, personalízala con el fondo corporativo de ATTACH y descárgala lista para usarla en tus
          canales internos.
        </p>

        <section>
          <ImageProcessor
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setResultImage={setResultImage}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            resultImage={resultImage}
          />

          <SectionParsed
            resultImage={resultImage}
            isProcessing={isProcessing}
          />
        </section>
      </main>
    </>
  );
};

export default App;