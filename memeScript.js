var img=document.getElementById('default-image');;

window.onload=function(){
  var deviceWidth = window.innerWidth;;
    var canvasWidth = Math.min(500, deviceWidth-20);
    var canvasHeight = Math.min(500, deviceWidth-20);
    var canvas = document.getElementById('memecanvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    var ctx = canvas.getContext('2d');  
    ctx.textAlign = 'center';
    ctx.lineWidth  = 4;
    ctx.font = '20pt impact';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineJoin = 'round'; 
    cargarDefault(ctx,canvas);
    

    var inputText= document.getElementById("texto-superior");
    inputText.value="";
    inputText.addEventListener('keyup',
      function(){
        pintarTexto(ctx,canvas); 
      }
      );

    var inputTextInferior= document.getElementById("texto-inferior");
    inputTextInferior.value="";
    inputTextInferior.addEventListener('keyup',
      function(){
        pintarTexto(ctx,canvas); 
      }
      );



  var imagen1= document.getElementById('img1');
  imagen1.addEventListener('click',
    function(){
      document.getElementById('p-texto-inferior').style.display="block";
      img=document.getElementById("img1");
      cargarDefault(ctx,canvas);
    }
    );

  var imagen2= document.getElementById('img2');
  imagen2.addEventListener('click',
    function(){
      inputTextInferior.value="";
      document.getElementById('p-texto-inferior').style.display="none";
      img=document.getElementById("img2");
      cargarDefault(ctx,canvas);
    }
    );

  var imagen3= document.getElementById('img3');
  imagen3.addEventListener('click',
function(){
      document.getElementById('p-texto-inferior').style.display="block";
      img=document.getElementById("img3");
      cargarDefault(ctx,canvas);
    }
    );


>>>>>>> master
//descarga
document.getElementById('download').addEventListener('click', function() {
  downloadCanvas(this, 'memecanvas', 'memeAppuntate.png');
}, false);

function downloadCanvas(link, canvasId, filename) {
  link.href = document.getElementById(canvasId).toDataURL();
  link.download = filename;
}

} 

function cargarDefault(ctx,canvas){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
}

function pintarTextoSuperior(ctx,canvas){
  var texto=document.getElementById("texto-superior").value.toUpperCase(); 
  var x=canvas.width/2;
  var y=50;
    var palabras= texto.split(' ');
    var linea=' ';    
    var limiteAncho= canvas.width;

    for(var i=0; i<palabras.length;i++){
      var lineaPrueba= linea + palabras[i] + ' ';
    var objetoLinea = ctx.measureText(lineaPrueba); 
    var anchoLinea= objetoLinea.width;

      if(anchoLinea>limiteAncho && i>0){
        ctx.strokeText(linea,x,y);
        ctx.fillText(linea,x,y);
        linea=palabras[i] + ' ';
        y+=30;//alto del texto definido en ctx.font
      } else{
        linea=lineaPrueba;
      }
    }     
  ctx.strokeText(linea,x,y);
  ctx.fillText(linea,x,y); 
}

function pintarTextoInferior(ctx,canvas){
  var texto=document.getElementById("texto-inferior").value.toUpperCase();
  var x=canvas.width/2;
  var y=canvas.height-20;
  var palabras= texto.split(' ');
    var linea=' ';    
    var limiteAncho= canvas.width;
    var cont=0;

    for(var i=palabras.length-1; i>=0;i--){
      var lineaPrueba= ' ' + palabras[i] + linea;
    var objetoLinea = ctx.measureText(lineaPrueba); 
    var anchoLinea= objetoLinea.width;

      if(anchoLinea>limiteAncho && i<palabras.length-1){
        cont++;
        ctx.strokeText(linea,x,y);
        ctx.fillText(linea,x,y);
        linea= ' ' + palabras[i];
        y-=30;//alto del texto definido en ctx.font
        
      } else{
        linea=lineaPrueba;
      }
    }     
  ctx.strokeText(linea,x,y);
  ctx.fillText(linea,x,y); 
}

function pintarTexto (ctx,canvas) {
  var textoSuperior=document.getElementById("texto-superior").value.toUpperCase();
  var textoInferior=document.getElementById("texto-inferior").value.toUpperCase();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img,0,0);

  pintarTextoSuperior(ctx,canvas);
  pintarTextoInferior(ctx,canvas);
}
