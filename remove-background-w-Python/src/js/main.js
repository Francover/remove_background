document.addEventListener('DOMContentLoaded', () => {
  downloadBtn.style.display = 'none';

  const elements = {
    input: document.getElementById('file'),
    label: document.querySelector('.labelFile'),
    resultImage: document.getElementById('result-image'),
    spinner: document.getElementById('mainLoader'),
    processBtn: document.getElementById('processBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    imgDefault: document.getElementById('imgDefault'),
    fileNameDisplay: document.querySelector('.file-name'),
    downloadLink: document.querySelector('.mainBtnDownload a')
  };

  setupFileInput(elements);
});

function setupFileInput({ input, processBtn, fileNameDisplay, imgDefault, spinner, resultImage, downloadBtn, downloadLink }) {
  let selectedFile = null; // Variable para almacenar el archivo seleccionado más reciente

  input.addEventListener('change', (event) => {
    selectedFile = event.target.files[0]; // Actualizar el archivo seleccionado
    if (!selectedFile) return;

    // Habilitar el botón "Procesar" al seleccionar una nueva imagen
    processBtn.disabled = false;

    fileNameDisplay.innerHTML = `<strong>Imagen seleccionada: </strong>${selectedFile.name}`;
    document.querySelector('.processBtn').style.marginTop = "3rem";

    // Reemplazar el botón para eliminar listeners previos
    const newProcessBtn = processBtn.cloneNode(true);
    processBtn.replaceWith(newProcessBtn);

    processBtn = newProcessBtn;

    processBtn.addEventListener('click', async () => {
      if (!selectedFile) return;
      imgDefault.style.display = 'none';         // Oculta la imagen por defecto
      resultImage.style.display = 'none';        // Oculta el resultado anterior
      spinner.style.display = 'block';           // Muestra el loader
      processBtn.disabled = true;

      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const response = await fetch('/process', { method: 'POST', body: formData });
        if (!response.ok) {
          const text = await response.text();
          alert('Error del servidor: ' + text);
          spinner.style.display = 'none';
          processBtn.disabled = false;
          return;
        }
        const data = await response.json();

        spinner.style.display = 'none';
        processBtn.disabled = false;

        if (data.result) {
          spinner.style.display = 'none';            // Oculta el loader
          resultImage.src = `data:image/png;base64,${data.result}`;
          resultImage.style.display = 'block';       // Muestra el resultado
          downloadBtn.href = resultImage.src;
          downloadBtn.setAttribute('download', 'foto-attach.png');
          downloadBtn.style.display = 'inline-block';
        }
      } catch (err) {
        alert('Error de red o JS: ' + err);
        spinner.style.display = 'none';
        processBtn.disabled = false;
      }
    });

    downloadBtn.style.display = 'none';
  });
}