const fs = require('fs');
const argv = require('yargs').argv;
const imgGen = require('js-image-generator');

const defaultSize = 800;
var input = argv.multiple;
var title = argv.title || 'placeholder';
var width = argv.width || defaultSize;
var height = argv.height || defaultSize;

function CheckSize(size) {
  if (size <= 0 || isNaN(size) || size === null) {
    console.log('Width/Height must be a number above 0.');
    size = defaultSize;
  }
  return size;
}

function generateImage(width, height, title) {
  imgGen.generateImage(width, height, 80, function(error, image) {
    if (error) console.log(error.stack);
    fs.writeFileSync('src/images/' + title + '_' + width + 'x' + height + '.jpg', image.data);
  });
}

if (height !== undefined) {
  height = CheckSize(parseInt(height));
}

if (width !== undefined) {
  width = CheckSize(parseInt(width));
}

if (input === true) {
  input = 'placeholders.json';
};

if (input !== undefined) {
  if (fs.existsSync(input)) {
    var inputContents = fs.readFileSync(input, 'utf8');
    try {
      inputContents = JSON.parse(inputContents);
    } catch (error) {
      console.log('Invalid JSON');
    }
  } else {
    console.log('File does not exist');
  }
}

if (
  inputContents !== undefined &&
  Object.entries(inputContents).length !== 0 &&
  inputContents.constructor === Object
) {
  if (Object.prototype.hasOwnProperty.call(inputContents, 'images')) {
    inputContents.images.forEach(function(image) {
      image.width = CheckSize(image.width);
      image.height = CheckSize(image.height);

      if (image.title === undefined) {
        image.title = 'placeholder_' + image.width + 'x' + image.height;
      }

      generateImage(image.width, image.height, image.title);
    });
  } else {
    console.log('Input file must be a JSON file with an array of "Images"');
  }
} else {
  generateImage(width, height, title);
}
