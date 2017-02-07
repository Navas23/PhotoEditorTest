var img = new Image();
img.src = 'test2.jpg';
img.crossOrigin = "Anonymous";
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var initValues = {
  'grayscale' : 0,
  'contrast' : 100,
  'brightness' : 100,
  'hue-rotate' : 0,
  'invert' : 0,
  'saturate' : 100,
  'sepia' : 0
}

var actualValues = JSON.parse( JSON.stringify( initValues ) );

var maxValues = {
  'grayscale' : 100,
  'contrast' : 250,
  'brightness' : 250,
  'hue-rotate' : 360,
  'invert' : 100,
  'saturate' : 250,
  'sepia' : 100
}

var initFilters = function(){

}

var modifyValue = function( type, value ){


  var unit = '%';
  if( type === 'hue-rotate' ){
    unit = 'deg'
  }

  /*console.log( type + '(' + parseInt( actualValues[type] ) + unit + ')' );
  console.log( type + '(' + parseInt(value) + unit + ')' );
  console.log(ctx.filter);*/

  $( '.' + type + ' .actual').val( value );
  ctx.filter = ctx.filter.replace( type + '(' + parseInt( actualValues[type] ) + unit + ')' , type + '(' + parseInt(value) + unit + ')');
  actualValues[type] = parseInt(value);

  redrawImage();

}

var redrawImage = function(){
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}

var guardar = function(){

  var dataURL = canvas.toDataURL();
  window.open(dataURL);
  
}

img.onload = function() {

  ctx.filter = 'grayscale(0%) contrast(100%) brightness(100%) hue-rotate(0deg) invert(0%) saturate(100%) sepia(0%)';
  ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                     0, 0, canvas.width, canvas.height); // destination rectangle
  console.log(ctx);

};
