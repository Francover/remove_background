import ImageProcessor from './components/ImageProcessor';

const App = () => {
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
        <ImageProcessor />


          <div id="sectionParsed">
            Vista previa
            <img id="imgDefault" src="/src/img/vistaprevia-default.png" alt="Vista previa" />

            <div id="mainLoader">
              <div className="loader"></div>
              <h4 id="spinner" aria-busy="true">
                Procesando
              </h4>
            </div>

            <img id="result-image" alt="Imagen procesada" />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;