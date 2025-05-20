from flask import Flask, render_template, request, jsonify
from PIL import Image
import requests
import base64
import io

app = Flask(__name__)

API_URL = 'https://demo.api4ai.cloud/img-bg-removal/v1/results'
API_HEADERS = {'A4A-CLIENT-APP-ID': 'sample'}  # Cambia esto si usas otra API/key

@app.route('/')
def index():
    return render_template('index.html')


def create_vertical_gradient(size, color1, color2):
    base = Image.new('RGBA', size, color1)
    top = Image.new('RGBA', size, color2)
    mask = Image.linear_gradient('L').resize(size)
    return Image.composite(top, base, mask)

@app.route('/process', methods=['POST'])
def process():
    if 'image' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['image']
    files = {'image': (file.filename, file.stream, file.mimetype)}

    # Llama a la API externa
    response = requests.post(API_URL, headers=API_HEADERS, files=files)
    if response.status_code != 200:
        return jsonify({'error': 'API error', 'detail': response.text}), 500

    # Extrae el resultado base64 de la respuesta de la API
    result = response.json()
    try:
        base64_img = result['results'][0]['entities'][0]['image']
    except Exception as e:
        return jsonify({'error': 'Error parsing API response', 'detail': str(e)}), 500

    # Decodifica la imagen sin fondo (¡fuera del except!)
    img_bytes = base64.b64decode(base64_img)
    img = Image.open(io.BytesIO(img_bytes)).convert("RGBA")

    # Crea el fondo (puedes personalizar los colores)
    background = create_vertical_gradient(img.size, (0, 102, 204, 255), (0, 204, 255, 255))

    # Combina la imagen sin fondo con el fondo personalizado
    background.paste(img, (0, 0), img)

    # Convierte el resultado a base64
    buf = io.BytesIO()
    background.save(buf, format='PNG')
    img_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')

    return jsonify({'result': img_base64})

if __name__ == '__main__':
    app.run(debug=True)