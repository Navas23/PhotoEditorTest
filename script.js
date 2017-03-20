var img = new Image();
//img.src = 'test.jpg';
//img.crossOrigin = "Anonymous";
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvasToDownload = $('#full-size-img');
var ctxToDownload = canvasToDownload[0].getContext('2d');

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

var initCanvasToDownload = function(){

  canvasToDownload.css({
    'width': img.width,
    'height': img.height,
  })

  .attr({
    'width': img.width,
    'height': img.height,
  });

  ctxToDownload.drawImage(img, 0, 0, img.width, img.height);

}

var initCanvasPreview = function(){

  ctx.filter = 'grayscale(0%) contrast(100%) brightness(100%) hue-rotate(0deg) invert(0%) saturate(100%) sepia(0%)';
  ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                     0, 0, canvas.width, canvas.height); // destination rectangle

}

var modifyValue = function( type, value ){


  var unit = '%';
  if( type === 'hue-rotate' ){
    unit = 'deg'
  }

  /*console.log( type + '(' + parseInt( actualValues[type] ) + unit + ')' );
  console.log( type + '(' + parseInt(value) + unit + ')' );
  console.log(ctx.filter);*/

  $( '.' + type + ' input').val( value );
  ctx.filter = ctx.filter.replace( type + '(' + parseInt( actualValues[type] ) + unit + ')' , type + '(' + parseInt(value) + unit + ')');
  actualValues[type] = parseInt(value);
  redrawImage();

}

var redrawImage = function(){
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}

var guardar = function(){

  ctxToDownload.filter = ctx.filter;
  ctxToDownload.drawImage(img, 0, 0, img.width, img.height);
  var dataURL = canvasToDownload[0].toDataURL('image/jpeg',1.0);
  window.open(dataURL);

}

img.onload = function() {

  console.log('load');
  initCanvasToDownload()
  initCanvasPreview();

};

$("#file_input").change(function(e){

    var URL = window.URL || window.webkitURL;
    var url = URL.createObjectURL(e.target.files[0]);
    img.src = url;

});
