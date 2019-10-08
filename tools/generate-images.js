var fs = require('fs');
var imgGen = require('js-image-generator');

var defaultSize = 800;

function GetParamaterValue(param) {
  if (process.argv != null) {
    var position = process.argv.indexOf(param, 2);
    if (position !== -1) {
      if (process.argv.length >= position + 2) {
        var value = process.argv[position + 1];
        return value;
      } else {
        return null;
      }
    }
  }
  return undefined;
}

function CheckSize(size) {
  if (size <= 0 || isNaN(size) || size === null) {
    console.log('Width/Height must be a number above 0.');
    size = defaultSize;
  }
  return size;
}

function generateImage(width = defaultSize, height = defaultSize, title) {
  imgGen.generateImage(width, height, 80, function(error, image) {
    if (error) console.log(error.stack);
    fs.writeFileSync('src/images/' + title + '.jpg', image.data);
  });
}

var width = GetParamaterValue('width');
var height = GetParamaterValue('height');
var input = GetParamaterValue('multiple');

if (height !== undefined) {
  height = CheckSize(parseInt(height));
} else {
  height = defaultSize;
}

if (width !== undefined) {
  width = CheckSize(parseInt(width));
} else {
  width = defaultSize;
}

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
  var title = 'placeholder_' + height + 'x' + width;
  generateImage(width, height, title);
}
