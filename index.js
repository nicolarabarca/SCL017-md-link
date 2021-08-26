const fs = require("fs");

mdLinks('./assets');


function mdLinks(path) {
  try {
    const isDirectory = fs.lstatSync(path).isDirectory(); // "variable que pasa a argumento"
    console.log(isDirectory);
    if (isDirectory) {
      fs.readdir(path, (err, files) => {
        files.forEach((file) => {
          if (file.includes('.md')) {
            fs.readFile(path+"/"+file, "utf-8", (err, data) => {
             // const lines = data.split(/\r?\n/);
            console.log(data);
          });
          }
         
        });
      });
}
  } catch (e) {
    // Handle error
    if (e.code == "ENOENT") {
      //no such file or directory
      //do something
    } else {
      //do something else
    }
  }
}




/*let linksToReview = []

fs.readFile("README.md", "utf-8", (err, data) => {
  const lines = data.split(/\r?\n/);
  lines.forEach((line) => {
    var hasLinks = line.indexOf('http://') !== -1 || line.indexOf('https://') !== -1
    if (hasLinks) {
      if (line.indexOf('http://') !== -1) {
        console.log('line http: ', line)
        let partialLink = line.substring(line.indexOf('http://'), line.length - 1)
        let finalLink = partialLink.substring(line.indexOf('http://'), line.indexOf(' ') - 1)
        console.log('finalLink http: ', finalLink)
        linksToReview.push(finalLink)
      }
      if (line.indexOf('https://') !== -1) {
        console.log('line https: ', line)
        let partialLink = line.substring(line.indexOf('https://'), line.length - 1)
        let finalLink = partialLink.substring(line.indexOf('https://'), line.indexOf(')') - 1)
        console.log('finalLink https: ', finalLink)
        linksToReview.push(finalLink)
      }
    }; //  borrar  punto y coma
  });
});*/