
var canvas;
var ctx;
 var x;
 var y;
 var download;
 var data;
 var fileInput;
 var img;


var imagen1= document.getElementById('img1');
imagen1.addEventListener('click',generarMeme1,false);

var imagen2= document.getElementById('img2');
imagen2.addEventListener('click',generarMeme2,false);

var imagen3= document.getElementById('img3');
imagen3.addEventListener('click',generarMeme3,false);

 window.onload = function() {

  var deviceWidth = window.innerWidth;;
  canvasWidth = Math.min(600, deviceWidth-20);
  canvasHeight = Math.min(480, deviceWidth-20);

  canvas = document.getElementById('memecanvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx = canvas.getContext('2d');
  cargarDefault();  
}

function cargarDefault(){
  img = document.getElementById('default-image');
  ctx.drawImage(img, 0, 0);

  var text ="Hola ke ase?";
  text = text.toUpperCase();

    ctx.textAlign = 'center';
    ctx.lineWidth  = 4;
    ctx.font = '25pt Raleway';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineJoin = 'round';

  wrapText(ctx, text, canvas.width/2, canvas.height - canvas.height/10, canvasWidth-canvasWidth/10, 30);
}

/**
* Funcion para generar meme1 
* Caracteristicas: 
* Opcion para colocar texto superior
* Opcion para colocar texto inferior
**/
function generarMeme1(){
  img=imagen1;
  document.getElementById('p-texto-superior').style.display="block";
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0);
    ctx.restore();

    pintarTexto();    
}

/**
* Funcion para generar meme2
* Caracteristicas
* Solo texto inferior
**/
function generarMeme2(){
  img=imagen2;
  document.getElementById('p-texto-superior').style.display="none";
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0);
    ctx.restore();

    pintarTexto();    
}

/**
* Funcion para generar meme3
* Caracteristicas
* Texto en minusculas
**/
function generarMeme3(){
  img=imagen3;
  document.getElementById('p-texto-superior').style.display="block";
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0);
    ctx.restore();

  var textoSup=document.getElementById('texto-superior').value;
  var text = document.getElementById('custom-text').value;
    //pintamos texto superior
  wrapText(ctx, textoSup, canvas.width/2, canvas.height - canvas.height/1.09, canvasWidth-canvasWidth/10, 30);

  //pintamos texto inferior 
  wrapText(ctx, text, canvas.width/2, canvas.height - canvas.height/8, canvasWidth-canvasWidth/10, 30);  
}





fileInput = document.getElementById('fileInput');
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

var verTexto = document.getElementById('boton-texto');
verTexto.addEventListener('click',pintarTexto,false);




function pintarTexto(){  

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    ctx.restore();

  var textoSup=document.getElementById('texto-superior').value;
  textoSup=textoSup.toUpperCase();
  if(document.getElementById('p-texto-superior').style.display=="none"){
    textoSup="";
  }

  text = document.getElementById('custom-text').value;
  text = text.toUpperCase();

    ctx.textAlign = 'center';
    ctx.lineWidth  = 4;
    ctx.font = '20pt impact';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineJoin = 'round';

  //pintamos texto superior
  wrapText(ctx, textoSup, canvas.width/2, canvas.height - canvas.height/1.09, canvasWidth-canvasWidth/10, 30);

  //pintamos texto inferior 
  wrapText(ctx, text, canvas.width/2, canvas.height - canvas.height/8, canvasWidth-canvasWidth/10, 30);

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

