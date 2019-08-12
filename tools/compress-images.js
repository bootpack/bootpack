const fs = require('fs');
const shell = require('shelljs');
const chalk = require('chalk');
const compressImages = require('compress-images');
const imageInput = './src/images-original/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}';
const imageOutput = './src/images/';

const dirs = [
  'src/images-original'
];

dirs.forEach((dir) => {
  console.log('Removing', dir);
  shell.rm('-rf', dir);
});

fs.rename('./src/images', './src/images-original', function (err) {
  if (err) {
    console.log(chalk.red.bold('Cannot rename directory. Try removing the "images-original" directory if it exists.'));
    throw err;
  }
});

// Compress Images
compressImages(imageInput, imageOutput, { compress_force: false, statistic: true, autoupdate: true }, false,
  {
    jpg: {
      engine: 'jpegRecompress',
      command: ['--accurate', '--quality', 'high', '--min', '60']
    }
  },
  {
    png: {
      engine: 'pngquant',
      command: ['--quality=70-90']
    }
  },
  {
    svg: {
      engine: 'svgo',
      command: '--multipass'
    }
  },
  {
    gif: {
      engine: 'gifsicle',
      command: ['--optimize']
    }
  },
  function(error, completed, statistic) {
    console.log('-------------');
    console.log(error);
    console.log(completed);
    console.log(statistic);
    console.log('-------------');
  }
);
