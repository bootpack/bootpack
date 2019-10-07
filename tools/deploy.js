const shell = require('shelljs');
const pkg = require('../package.json');

// Deploy to gh-pages branch
if (process.argv[3] === 'gh-pages') {
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  } else if (!shell.which('npm')) {
    shell.echo('Sorry, this script requires npm');
    shell.exit(1);
  }

  if (shell.exec('git checkout master').code !== 0) {
    shell.echo('Error: \'git checkout master\' failed');
    shell.exit(1);
  }

  if (shell.exec('npm install').code !== 0) {
    shell.echo('Error: \'npm install\' failed');
    shell.exit(1);
  }

  shell.rm('-rf', 'dist');

  shell.exec('git worktree remove dist');

  if (shell.exec('git worktree add dist gh-pages').code !== 0) {
    shell.echo('Error: \'git worktree add dist gh-pages\' failed');
    shell.exit(1);
  }

  shell.mkdir('.temp');
  shell.cp('dist/.git', '.temp/.git');

  if (shell.exec('npm run build').code !== 0) {
    shell.echo('Error: \'npm run build\' failed');
    shell.exit(1);
  }

  shell.cp('.temp/.git', 'dist/.git');

  shell.rm('-rf', '.temp');

  shell.cd('dist');

  if (shell.exec('git add .').code !== 0) {
    shell.echo('Error: \'git add .\' failed');
    shell.exit(1);
  }

  if (shell.exec('git commit -m v' + pkg.version).code !== 0) {
    shell.echo('Error: \'git commit -m v' + pkg.version + '\' failed');
    shell.exit(1);
  }

  if (shell.exec('git push origin gh-pages').code !== 0) {
    shell.echo('Error: \'git push origin gh-pages\' failed');
    shell.exit(1);
  }
} else {
  shell.exit(1);
}
