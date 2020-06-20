const fs = require('fs');

function getCountFilesInDirectory(dir) {
  let files = fs.readdirSync(dir);
  return files.length;
}

// Вернем кол-во файлов для приложения
function getCountFilesInDirectoryApplication(dirApplication, dirsPaired, pairName) {
  const applicationPath = `./public/applications/${dirApplication}`;
  let countFiles = {};

  fs.readdirSync(applicationPath).forEach(elementDir => {
    countFiles[elementDir] = getCountFilesInDirectory(`${applicationPath}/${elementDir}`);
  });

  // Т.к для пары мб в разных папках разное кол-во файлов, то возьмем min значение  
  dirsPaired.forEach(function (pair) {
    if (countFiles[pair[0]] >= countFiles[pair[1]]) {
      countFiles[pairName] = countFiles[pair[1]];
    } else {
      countFiles[pairName] = countFiles[pair[0]];
    }

    // удалим неиспользумые св-ва (т.к пара образовалась)
    delete countFiles[pair[0]];
    delete countFiles[pair[1]];
  });

  return countFiles;
}

module.exports.getCountFilesInDirectoryApplication = getCountFilesInDirectoryApplication;
