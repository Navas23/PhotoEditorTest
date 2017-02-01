var img = new Image();
img.src = 'test2.jpg';
img.crossOrigin = "Anonymous";
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var initValues = {
  grayscale : 0,
  contrast : 100,
  brightness : 100
}
var actualValues = {
  grayscale : 0,
  contrast : 100,
  brightness : 100
}
var maxValues = {
  grayscale : 100,
  contrast : 250,
  brightness : 250
}

var modifyValue = function( type, value ){

  $( '.' + type + ' .actual').val( value );
  ctx.filter = type + '(' + parseInt(value) + '%)';
  console.log( ctx.filter );
  redrawImage();

}

var redrawImage = function(){
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}

var guardar = function(){
  console.log(this);
  var dataURL = canvas.toDataURL();
  window.open(dataURL);
}

img.onload = function() {

  ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                     0, 0, canvas.width, canvas.height); // destination rectangle
  console.log(ctx);
  /*img.style.display = 'none';
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  console.log(imageData);*/

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
