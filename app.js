// app.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');

    let drawing = false;
    let currentColor = '#000000';
    let currentBrushSize = 5;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - document.querySelector('.toolbar').offsetHeight;
    }

    function startDrawing(event) {
        drawing = true;
        draw(event);
    }

    function endDrawing() {
        drawing = false;
        ctx.beginPath();
    }

    function draw(event) {
        if (!drawing) return;

        ctx.lineWidth = currentBrushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;

        ctx.lineTo(event.clientX, event.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX, event.clientY);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    canvas.addEventListener('pointerdown', startDrawing);
    canvas.addEventListener('pointerup', endDrawing);
    canvas.addEventListener('pointermove', draw);

    colorPicker.addEventListener('input', (event) => {
        currentColor = event.target.value;
    });

    brushSize.addEventListener('input', (event) => {
        currentBrushSize = event.target.value;
    });
});
