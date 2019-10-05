var fs = require('fs');
var imgGen = require('js-image-generator');

function GetParamaterValue(param) {
  if (process.argv != null) {
    var position = process.argv.indexOf(param, 2);
    if (position !== -1 && process.argv.length >= position + 2) {
      var value = process.argv[position + 1];
      return value;
    }
  }
  return -1;
}

var width = parseInt(GetParamaterValue('width'));
var height = parseInt(GetParamaterValue('height'));

if (width <= 0 || isNaN(width)) {
  width = 800;
  console.log('Width must be a number above 0.');
}

if (height <= 0 || isNaN(height)) {
  height = 600;
  console.log('Height must be a number above 0.');
}

// Generate one image
imgGen.generateImage(width, height, 80, function(error, image) {
  if (error) console.log(error.stack);
  fs.writeFileSync('src/images/placeholder.jpg', image.data);
});

// Generate multiple images
// for(var i=1;i<=10;i++){
//     imgGen.generateImage(800, 600, 80, function(err, image) {
//         console.log("Generating image #" +i);
//         fs.writeFileSync('placeholder-' + i + '.jpg', image.data);
//     });
// }
