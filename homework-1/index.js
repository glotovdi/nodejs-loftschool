const fs = require('fs');
const rimraf = require('rimraf');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let src;
let dist;
let isDeleteSrc;

async function askSource() {
  return new Promise(resolve => {
    rl.question('Enter source folder? ', src => {
      resolve(src);
    });
  });
}

async function askDist() {
  return new Promise(resolve => {
    rl.question('Enter distination folder? ', dist => {
      resolve(dist);
    });
  });
}

async function askDeleteSrcFolder() {
  return new Promise(resolve => {
    rl.question('Do you want to delete source folder? ', answer => {
      if (answer === 'true') {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}

startApp();

async function startApp() {
  src = await askSource();
  dist = await askDist();
  isDeleteSrc = (await askDeleteSrcFolder()) === 'true' ? true : false;
  rl.close();

  const isExistDist = fs.existsSync(dist);

  if (!isExistDist) {
    fs.mkdirSync(dist);
  }

  readDirectory(src, dist);

  if (isDeleteSrc) {
    rimraf.sync(src);
  }
}

function readDirectory(src, dist) {
  const files = fs.readdirSync(src);

  files.forEach(file => {
    const fileName = `${src}/${file}`;

    const stat = fs.statSync(fileName);

    if (stat.isDirectory()) {
      moveFiles(fileName, dist);
      return;
    }

    const newPath = `${dist}/${file[0].toUpperCase()}`;
    createDir(newPath, fileName, file);
  });
}

function createDir(newPath, fileName, file) {
  const isExist = fs.existsSync(newPath);

  if (!isExist) {
    fs.mkdirSync(newPath);
  }

  fs.renameSync(fileName, `${newPath}/${file}`);
}
