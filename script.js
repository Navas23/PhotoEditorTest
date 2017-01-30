var img = new Image();
img.src = 'test.jpg';
img.crossOrigin = "Anonymous";
console.log(img);
var canvas = document.getElementById('canvas');
console.log(canvas);
var ctx = canvas.getContext('2d');
console.log(ctx);

img.onload = function() {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
};

var color = document.getElementById('color');

var pick = function(event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = ctx.getImageData(x, y, 1, 1);
  var data = pixel.data;
  var rgba = 'rgba(' + data[0] + ',' + data[1] +
             ',' + data[2] + ',' + (data[3] / 255) + ')';
  color.style.background =  rgba;
  color.textContent = rgba;
}
//canvas.addEventListener('mousemove', pick);
