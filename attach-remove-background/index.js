// Example of using API4AI background removal.

// Use 'demo' mode just to try api4ai for free. Free demo is rate limited.
// For more details visit:
//   https://api4.ai

// Use 'rapidapi' if you want to try api4ai via RapidAPI marketplace.
// For more details visit:
//   https://rapidapi.com/api4ai-api4ai-default/api/background-removal4/details
const MODE = 'demo'

// Your RapidAPI key. Fill this variable with the proper value if you want
// to try api4ai via RapidAPI marketplace.
const RAPIDAPI_KEY = ''

const OPTIONS = {
  demo: {
    url: 'https://demo.api4ai.cloud/img-bg-removal/v1/results',
    headers: { 'A4A-CLIENT-APP-ID': 'sample' }
  },
  rapidapi: {
    url: 'https://background-removal4.p.rapidapi.com/v1/results',
    headers: { 'X-RapidAPI-Key': RAPIDAPI_KEY }
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  const input = document.getElementById('file')
  const resultImage = document.getElementById('result-image')
  const sectionParsed = document.getElementById('sectionParsed')
  const spinner = document.getElementById('spinner')

  input.addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (!file) {
      return false
    }

    sectionParsed.hidden = true
    spinner.hidden = false

    // Preapare request.
    const form = new FormData()
    form.append('image', file)
    const requestOptions = {
      method: 'POST',
      body: form,
      headers: OPTIONS[MODE].headers
    }

    function applyBackground(imageSrc, backgroundColor = "lightblue") {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
      
        const img = new Image();
        img.src = imageSrc;
        img.onload = function () {
          canvas.width = img.width;
          canvas.height = img.height;
      
          // Dibujar el fondo de color
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
      
          // Dibujar la imagen sin fondo encima
          ctx.drawImage(img, 0, 0);
      
          // Reemplazar la imagen original con la nueva
          document.getElementById("result-image").src = canvas.toDataURL("image/png");
      
          // Actualizar el botón de descarga
          const btn2dwld = document.querySelector("#download-btn a");
          btn2dwld.setAttribute("href", canvas.toDataURL("image/png"));
          btn2dwld.setAttribute("download", "result.png");
        };
      }
      

    // Make request.
    fetch(OPTIONS[MODE].url, requestOptions)
      .then(response => response.json())
      .then(function (response) {
        // Parse response and show result image.
        const imgBase64 = response.results[0].entities[0].image
        resultImage.src = 'data:image/png;base64,' + imgBase64
        sectionParsed.hidden = false
        applyBackground('data:image/png;base64,' + imgBase64, "#FFD700"); // Fondo dorado


        const btn2dwld = document.querySelector("#download-btn a");

        btn2dwld.setAttribute("href", resultImage.src);
        btn2dwld.setAttribute("download", "/result.png");
      })
      .catch(function (error) {
        // Error can be handled here.
        console.error(error)
      })
      .then(function () {
        spinner.hidden = true
      })
  })
})
