import type { SectionParsedProps } from '../types/SectionParsedProps';

const SectionParsed: React.FC<SectionParsedProps> = ({ resultImage, isProcessing }) => (
  <div id="sectionParsed">
    Vista previa
    {(!resultImage && !isProcessing) && (
      <img
        id="imgDefault"
        src="/src/img/vistaprevia-default.png"
        alt="Vista previa"
        style={{ display: 'block' }}
      />
    )}
    <div id="mainLoader" style={{ display: isProcessing ? 'block' : 'none' }}>
      <div className="loader"></div>
      <h4 id="spinner" aria-busy="true">Procesando</h4>
    </div>
    {resultImage && (
      <img
        id="result-image"
        alt="Imagen procesada"
        src={resultImage}
        style={{ display: 'block' }}
      />
    )}
  </div>
);

export default SectionParsed;