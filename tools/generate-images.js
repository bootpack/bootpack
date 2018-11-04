var fs = require('fs');
var imgGen = require('js-image-generator');

// Generate one image
imgGen.generateImage(800, 600, 80, function(error, image) {
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
