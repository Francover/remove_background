// Example of using API4AI background removal.

const MODE = 'demo';
const RAPIDAPI_KEY = '';

const OPTIONS = {
  demo: {
    url: 'https://demo.api4ai.cloud/img-bg-removal/v1/results',
    headers: { 'A4A-CLIENT-APP-ID': 'sample' }
  },
  rapidapi: {
    url: 'https://background-removal4.p.rapidapi.com/v1/results',
    headers: { 'X-RapidAPI-Key': RAPIDAPI_KEY }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    input: document.getElementById('file'),
    label: document.querySelector('.labelFile'),
    resultImage: document.getElementById('result-image'),
    spinner: document.getElementById('mainLoader'),
    processBtn: document.getElementById('processBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    btnTooltip: document.getElementById('tooltipTrigger'),
    btnTooltipMensaje: document.getElementById('tooltipMsg'),
    closeTooltip: document.getElementById('closeTooltip'),
    imgDefault: document.getElementById('imgDefault'),
    fileNameDisplay: document.querySelector('.file-name'),
    downloadLink: document.querySelector('.mainBtnDownload a')
  };

  setupTooltip(elements);
  setupFileInput(elements);
});

function setupTooltip({ btnTooltip, btnTooltipMensaje, closeTooltip }) {
  const showTooltip = () => {
    btnTooltipMensaje.style.display = 'block';
  }
  const hideTooltip = () => {
    btnTooltipMensaje.style.display = 'none';
  }

  btnTooltip.addEventListener('mouseover', showTooltip);
  btnTooltip.addEventListener('mouseleave', hideTooltip);
  btnTooltip.addEventListener("click", () => {
    btnTooltip.addEventListener("mouseleave", () => {
      btnTooltipMensaje.style.display = "block";
    });
    btnTooltipMensaje.style.display = "block";
  });

  closeTooltip.addEventListener("click", () => {
    btnTooltip.addEventListener("mouseleave", () => {
      btnTooltipMensaje.style.display = "none";
    });
    btnTooltipMensaje.style.display = "none";
  });
}

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

    newProcessBtn.addEventListener('click', async () => {
      if (!selectedFile) return; // Asegurarse de que haya un archivo seleccionado

      resultImage.src = '';
      resultImage.hidden = true; // Ocultar la imagen de resultado

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo

      imgDefault.style.display = 'none';
      spinner.style.display = 'block';

      try {
        const imgBase64 = await processImage(selectedFile); // Usar el archivo más reciente
        updateResultImage(imgBase64, resultImage, downloadLink);
      } catch (error) {
        console.error('Error processing image:', error);
      } finally {
        spinner.style.display = 'none';
        newProcessBtn.disabled = true;
        input.addEventListener('change', (event) => {
          newProcessBtn.disabled = false;
        });
        // Deshabilitar el botón después de procesar
        downloadBtn.disabled = false;
      }
    });
  });
}

async function processImage(file) {
  const form = new FormData();
  form.append('image', file);

  const response = await fetch(OPTIONS[MODE].url, {
    method: 'POST',
    body: form,
    headers: OPTIONS[MODE].headers
  });

  const data = await response.json();
  return data.results[0].entities[0].image;
}

async function updateResultImage(imgBase64, resultImage, downloadLink) {
  const imageSrc = `data:image/png;base64,${imgBase64}`;
  
  // Ocultar la imagen y restablecer el atributo src
  resultImage.hidden = true;
  resultImage.src = ''; // Restablecer el src para evitar mostrar una imagen rota

  resultImage.onload = () => {
    // Mostrar la imagen solo después de que haya cargado
    resultImage.hidden = false;
  };

  resultImage.src = imageSrc; // Asignar la nueva fuente

  try {
    const canvas = applyBackground(imageSrc);
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = 'result.png';
  } catch (error) {
    console.error('Error applying background:', error);
  }
}

function applyBackground(imageSrc) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.src = imageSrc;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;

    // Crear el gradiente
    const gradientFill = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradientFill.addColorStop(0, "#22CCBF"); // Color inicial
    gradientFill.addColorStop(1, "#2A70C4"); // Color final


    // Dibujar el fondo con el gradiente
    ctx.fillStyle = gradientFill;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar la imagen sin fondo encima
    ctx.drawImage(img, 0, 0);

    // Reemplazar la imagen original con la nueva
    document.getElementById("result-image").src = canvas.toDataURL("image/png");


    // Actualizar el botón de descarga
    const btn2dwld = document.querySelector(".mainBtnDownload a");
    btn2dwld.setAttribute("href", canvas.toDataURL("image/png"));
    btn2dwld.setAttribute("download", "result.png");
  };
}
