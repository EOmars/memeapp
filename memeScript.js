
var canvas;
var ctx;
 var verTexto;
 var x;
 var y;
 var download;
 var data;
 var fileInput;
 var img;

fileInput = document.getElementById('fileInput');

var imagen1= document.getElementById('img1');
imagen1.addEventListener('click',generarMeme1,false);

function generarMeme1(){
  img=imagen1;
  document.getElementById('p-texto-superior').style.display="block";
   ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0);

    ctx.restore();

    text = document.getElementById('texto-superior').value;
    text = text.toUpperCase();
    wrapText(ctx, text, canvas.width/2, canvas.height - canvas.height/1.1, canvasWidth-canvasWidth/3, 30);
    pintarTexto();
    
}

fileInput.addEventListener('change', function(e) {
    
    var reader = new FileReader();
    reader.onload = function(event){

        img.onload = function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img,0,0);
            pintarTexto();
        }
        img.src = reader.result;
    }
    reader.readAsDataURL(fileInput.files[0]); 

   }, false);

verTexto = document.getElementById('boton-texto');
verTexto.addEventListener('click',doTransform,false);

 window.onload = function() {

  var deviceWidth = window.innerWidth;;
  canvasWidth = Math.min(600, deviceWidth-20);
  canvasHeight = Math.min(480, deviceWidth-20);

  canvas = document.getElementById('memecanvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx = canvas.getContext('2d');
  cargarDefault();
  pintarTexto();
}

function cargarDefault(){
  img = document.getElementById('default-image');
  ctx.drawImage(img, 0, 0);
}

function pintarTexto(){
  text = document.getElementById('custom-text').value;
  text = text.toUpperCase();

    ctx.textAlign = 'center';
    ctx.lineWidth  = 4;
    ctx.font = '20pt impact';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineJoin = 'round';

  wrapText(ctx, text, canvas.width/2, canvas.height - canvas.height/5, canvasWidth-canvasWidth/10, 30);
}

//descarga
document.getElementById('download').addEventListener('click', function() {
  downloadCanvas(this, 'memecanvas', 'memeAppuntate.png');
}, false);

function downloadCanvas(link, canvasId, filename) {
  link.href = document.getElementById(canvasId).toDataURL();
  link.download = filename;
}



  function doTransform() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0);

    ctx.restore();

    text = document.getElementById('custom-text').value;
    text = text.toUpperCase();
    wrapText(ctx, text, canvas.width/2, canvas.height - canvas.height/4.5, canvasWidth-canvasWidth/3, 30);
    
  }



  // Modified from http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) { 
      var testLine = line + words[n] + ' '; 
      var metrics = ctx.measureText(testLine); 
      var testWidth = metrics.width; 
      if (testWidth > maxWidth && n > 0) {
        ctx.strokeText(line, x, y);
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    ctx.strokeText(line, x, y);
    ctx.fillText(line, x, y);
  }

