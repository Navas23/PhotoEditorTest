var img = new Image();
img.src = 'test2.jpg';
img.crossOrigin = "Anonymous";
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var imageData;
var brilloActual = 0;

var modificarActual = function(valor){
  $('.actual').text( valor );
  filtra2( parseInt(valor) );
}

img.onload = function() {

  ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                     0, 0, canvas.width, canvas.height); // destination rectangle
  img.style.display = 'none';
  console.log(ctx);
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  console.log(imageData);

};

var filtra1 = function(){
  ctx.putImageData( grayscale( imageData ) ,0,0)
}

var filtra2 = function(x){
  valor = x;
  ctx.putImageData( brightness( imageData, x ) ,0,0)
}

var filtra3 = function(){
  valor = -valor;
  ctx.putImageData( brightness( imageData, valor ) ,0,0)
}

/*setInterval( function(){
  filtra2();
  console.log('paso');
}, 20 );*/

var grayscale = function(pixels) {

  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;

};

var reverseGrayscale = function(pixels){

  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    d[i]  = r/0.2126;
    d[i+1] = g/0.7152;
    d[i+2] = b/0.0722;
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;

}

var brightness = function(pixels, adjustment) {

  console.log('recibo ajustar brillo al ' + adjustment);
  console.log('tenia el brillo en ' + brilloActual);
  var aux = adjustment - brilloActual;
  brilloActual = adjustment;
  adjustment = aux;
  console.log('aplico el valor ' + adjustment);

  //brilloActual += adjustment;
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    d[i] += adjustment;
    d[i+1] += adjustment;
    d[i+2] += adjustment;
  }
  return pixels;

};

//canvas.addEventListener( 'mousemove',  );

/*var color = document.getElementById('color');

var pick = function(event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = ctx.getImageData(x, y, 1, 1);
  var data = pixel.data;
  var rgba = 'rgba(' + data[0] + ',' + data[1] +
             ',' + data[2] + ',' + (data[3] / 255) + ')';
  color.style.background =  rgba;
  color.textContent = rgba;
}*/
